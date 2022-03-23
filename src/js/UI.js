import { selector } from "./utils/consts.js";
import Lotto from "./Lotto.js";

class UI {
  
  #lottoPurchaseForm = selector('.lotto-purchase-form');  
  #lottoPurchaseInput = selector('.lotto-purchase-input');
  #lottoPurchaseBtn = selector('.lotto-purchase-btn');
  #ticketContainer;
  #countedTicketLabel;
  #lottoTicketUI;
  #switchBtn;
  #toggle;
  #randomNumberLists;

  setEvent() {
    this.#lottoPurchaseForm.addEventListener('submit', (event) => {
      event.preventDefault()
    })

    this.#lottoPurchaseInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && event.target.value !== "") {
        const lotto = new Lotto(event.target.value)
        const amount = lotto.lottoTicketAmount

        this.#lottoTicketUI = [selector('#purchased-lottos'), selector('#lotto-winning-numbers-form')]
        
        if (!this.isPassValidateAmount(amount)) return;
        
        this.changeLottoTicketUI(amount)
        this.changeTicketsUiAccordingToSwitchState(amount)
      }
    })

    this.#lottoPurchaseBtn.addEventListener('click', (event) => {
      const lotto = new Lotto(event.path[1].childNodes[1].value)
      const amount = lotto.lottoTicketAmount
      
      this.#lottoTicketUI = [selector('#purchased-lottos'), selector('#lotto-winning-numbers-form')]

      if (!this.isPassValidateAmount(amount)) return;

      this.changeLottoTicketUI(amount)
      this.changeTicketsUiAccordingToSwitchState(amount)
    })
  }

  isPassValidateAmount(amount) {
    this.#toggle = selector('.lotto-numbers-toggle-button')
    if (!this.changeUIWhenAmountDoNotPassValidation(amount)) return;
    return true
  }
  
  changeUIWhenAmountDoNotPassValidation(amount) {
    if (!amount) {
      this.#lottoPurchaseInput.value = ""
      this.removeCssStyleWhenResubmitting()
      return false
    }
    this.changeCssStyleWhenResubmitting()
    return true
  }

  removeCssStyleWhenResubmitting() {
    if (this.#toggle) {
      this.#toggle.checked = false
      this.#ticketContainer?.classList.remove('flex-col')
      this.#lottoTicketUI.forEach(tag => tag.style.display = "none")
    }
  }

  changeCssStyleWhenResubmitting() {
    if (this.#toggle) {
      this.#toggle.checked = false
      this.#ticketContainer?.classList.remove('flex-col')
    }
  }

  changeLottoTicketUI(amount) {

    this.#ticketContainer = selector('ul[data-ticket]');
    this.#countedTicketLabel = selector('#counted-ticket');

    this.#countedTicketLabel.textContent = `총 ${amount}개를 구매하였습니다.`
    this.#ticketContainer.innerHTML = `
        <li class="mx-1 text-4xl" data-ticket="list">
          <span data-ticket="image">🎟️ </span>
          <span class="text-xl" style="display: none; vertical-align: middle;" data-ticket="numbers"></span>
        </li>\n`.repeat(amount)
  
    this.#lottoTicketUI.forEach(tag => tag.style.display = "block")
  }

  changeTicketsUiAccordingToSwitchState(amount) {
    this.#switchBtn = selector('.switch');
    const randomNumber = Lotto.createRandomNumberFromOneToFortyFive(amount)
    this.#switchBtn.addEventListener('click', event => this.handleSwitchEvent(event, randomNumber))
  }


  handleSwitchEvent(event, randomNumber) {
    if (event.target && event.target.nodeName === 'INPUT') {
      this.changeUIAccordingToSwitch(event, randomNumber)
    }
  }

  changeUIAccordingToSwitch(event, randomNumber) {
    this.#randomNumberLists = document.querySelectorAll('li[data-ticket="list"]')
    if (event.target.checked) {
      this.#randomNumberLists.forEach((li, index) => {
        li.lastElementChild.style.display = "inline"
        li.lastElementChild.textContent = randomNumber[index]
      })
      this.#ticketContainer.classList.add('flex-col')
    } else {
      this.#ticketContainer.classList.remove('flex-col')
      this.#randomNumberLists.forEach(li => {
        li.lastElementChild.style.display = "none"
      })
    }
  }

}




export default UI;
