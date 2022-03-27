import { selector } from "../utils/consts.js";

// const showResultButton = selector('.open-result-modal-button');
// const modalClose = selector('.modal-close');
// const modal = selector('.modal');
// const lottoNumbersToggleButton = selector('.lotto-numbers-toggle-button');




class LottoModal {
  #modal
  #profitRate
  #rankCount
  #lottoModalCloseBtn

  constructor({profitRate, rankCount}) {
    this.#profitRate = profitRate
    this.#rankCount = rankCount
  }

  setEvent() {
    this.#modal = selector('.modal')
    this.onModalShow()
    
    this.#lottoModalCloseBtn = selector('.modal-close')
    this.#lottoModalCloseBtn.addEventListener('click', () => {this.onModalClose()})
  }

  onModalShow() {
    this.#modal.classList.add('open')
  }

  onModalClose() {
    this.#modal.classList.remove('open')
}
}

export default LottoModal;
