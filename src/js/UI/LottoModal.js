import { selector, selectorAll } from "../utils/consts.js";

// const showResultButton = selector('.open-result-modal-button');
// const modalClose = selector('.modal-close');
// const modal = selector('.modal');
// const lottoNumbersToggleButton = selector('.lotto-numbers-toggle-button');




class LottoModal {
  #modal
  #profitRate
  #rankCount
  #lottoModalCloseBtn
  #lottoModalRestartBtn
  #lottoTicketUI

  constructor({profitRate, rankCount}) {
    this.#profitRate = profitRate
    this.#rankCount = rankCount
  }

  setEvent() {
    this.#modal = selector('.modal')
    this.onModalShow()
    
    this.#lottoModalCloseBtn = selector('.modal-close')
    this.#lottoModalRestartBtn = selector('.restart')
    this.#lottoTicketUI = [selector('#purchased-lottos'), selector('#lotto-winning-numbers-form')]; // 어떻게 이 변수 중복을 피할까?

    this.#lottoModalCloseBtn.addEventListener('click', () => {this.onModalClose()})
    this.#lottoModalRestartBtn.addEventListener('click', () => {
      selectorAll('input').forEach(tag => tag.value = "")
      this.#lottoTicketUI.forEach(tag => tag.style.display = "none")
      this.onModalClose()
    })
  }

  onModalShow() {
    this.#modal.classList.add('open')
  }

  onModalClose() {
    this.#modal.classList.remove('open')
}
}

export default LottoModal;
