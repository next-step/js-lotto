import { selector, selectorAll } from "../utils/consts.js";

class LottoModal {
  #modal
  #profitRate
  #rankCount
  #lottoModalCloseBtn
  #lottoModalRestartBtn
  #lottoTicketUI
  #lottoPrizeCount
  #lottoProfitRate

  constructor({profitRate, rankCount}) {
    this.#profitRate = profitRate
    this.#rankCount = rankCount.reverse()
  }

  setEvent() {
    this.#modal = selector('.modal')
    this.onModalShow()
    
    this.#lottoModalCloseBtn = selector('.modal-close')
    this.#lottoModalRestartBtn = selector('.restart')
    this.#lottoTicketUI = [selector('#purchased-lottos'), selector('#lotto-winning-numbers-form')]; // 어떻게 이 변수 중복을 피할까?

    this.showLottoDataResult()

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

  showLottoDataResult() {
    this.#lottoPrizeCount = selectorAll('.prize-count') 
    this.#lottoProfitRate = selector('.profit-rate')

    this.#lottoPrizeCount.forEach((count, i) => count.textContent = this.#rankCount[i])
    this.#lottoProfitRate.textContent = `당신의 총 수익률은 ${this.#profitRate}%입니다.`
  }
}

export default LottoModal;
