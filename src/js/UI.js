import { $ } from "./utils/consts.js";
import Lotto from "./Lotto.js";

class UI {
  
  #ticketContainer;
  #lottoPurchaseForm = $('.lotto-purchase-form');  
  #lottoPurchaseInput = $('.lotto-purchase-input');
  #lottoPurchaseBtn = $('.lotto-purchase-btn');

  setEvent() {

    this.#lottoPurchaseForm.addEventListener('submit', (event) => {
      event.preventDefault()
    })

    this.#lottoPurchaseInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && event.target.value !== "") {
        const lotto = new Lotto(event.target.value)
        const amount = lotto.lottoTicketAmount
        this.changeLottoTicketUI(event, amount)
        
        this.changeTicketsUiAccordingToSwitchState(amount)
      }
    })

    this.#lottoPurchaseBtn.addEventListener('click', (event) => {
      const lotto = new Lotto(event.path[1].childNodes[1].value)
      const amount = lotto.lottoTicketAmount
      // 왜 메소드를 사용할 수 없지??
      this.changeLottoTicketUI(event, amount)

      this.changeTicketsUiAccordingToSwitchState(amount)
    })
  }


  changeLottoTicketUI(event, amount) {

    if (!amount) {
      event.target.value = ""
      return;
    }

    this.#ticketContainer = $('ul[data-ticket]');
    const countedTicketLabel = $('#counted-ticket');

    countedTicketLabel.textContent = `총 ${amount}개를 구매하였습니다.`
    this.#ticketContainer.innerHTML = `
        <li class="mx-1 text-4xl" data-ticket="list">
          <span data-ticket="image">🎟️ </span>
          <span class="text-xl" style="display: none; vertical-align: middle;" data-ticket="numbers"></span>
        </li>\n`.repeat(amount)
  
    const tagsShownAccordingToPurchaseStatus = [$('#purchased-lottos'), $('#lotto-winning-numbers-form')]
    tagsShownAccordingToPurchaseStatus.forEach(tag => tag.style.display = "block")
  }

  changeTicketsUiAccordingToSwitchState(amount) {
    const $switch = $('.switch');
    const randomNumber = Lotto.createRandomNumberFromOneToFortyFive(amount)
    $switch.addEventListener('click', event => this.handleSwitchEvent(event, randomNumber))
  }

  handleSwitchEvent(event, randomNumber) {
    const $randomNumberLists = document.querySelectorAll('li[data-ticket="list"]')
    
    if (event.target && event.target.nodeName === 'INPUT') {
      if (event.target.checked) {
        
        $randomNumberLists.forEach((li, index) => {
          li.lastElementChild.style.display = "inline"
          li.lastElementChild.textContent = randomNumber[index]
        })
        this.#ticketContainer.classList.add('flex-col')
      } else {
        this.#ticketContainer.classList.remove('flex-col')
        $randomNumberLists.forEach(li => {
          li.lastElementChild.style.display = "none"
        })
      }
    }
  }

}




export default UI;
