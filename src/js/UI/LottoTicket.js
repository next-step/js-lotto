import Lotto from "../Lotto.js";
import LottoWinning from "./LottoWinning.js";

import { selector } from "../utils/consts.js";


class LottoTicket {
  #ticketContainer;
  #countedTicketLabel;
  #lottoTicketUI;
  #switchBtn;
  #randomNumberLists;
  #lotto
  #amount

  constructor(lotto) {
    this.#lotto = lotto
    this.#amount = lotto.lottoTicketAmount
    this.renderLottoTicket(this.#amount)
  }
  renderLottoTicket(amount) {
    this.changeLottoTicketUI(amount)
    this.changeTicketsUiAccordingToSwitchState(amount)
    new LottoWinning(this.#lotto).setEvent()
  }

  changeLottoTicketUI(amount) {
    this.#ticketContainer = selector('ul[data-ticket]');
    this.#countedTicketLabel = selector('#counted-ticket');
    this.#lottoTicketUI = [selector('#purchased-lottos'), selector('#lotto-winning-numbers-form')] // 어떻게 이 변수 중복을 피할까?

    this.#countedTicketLabel.textContent = `총 ${amount}개를 구매하였습니다.`
    this.#ticketContainer.innerHTML = `
        <li class="mx-1 text-4xl" data-ticket="list">
          <span data-ticket="image">🎟️ </span>
          <span class="text-xl" style="display: none; vertical-align: middle;" data-ticket="numbers"></span>
        </li>\n`.repeat(amount)
  
    this.#lottoTicketUI.forEach(tag => tag.style.display = "block")
  }


  // 여기서부터 스위치 인데 저기 위가 스위치에 관여함
  // 저기 위에서 스위치에 관여하는 부분이
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

export default LottoTicket;
