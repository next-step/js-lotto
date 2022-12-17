import { render } from '../../util/render.js'
import { DOM_ELEMENT } from './lotto.constant.js'
import selectors from './lotto.selector.js'

export const updateLottoState = (lottoCnt) => {
  selectors.toggle.checked = false
  selectors.listLotto.innerText = ''
  selectors.listLotto.style = ''
  selectors.labelBuyCnt.innerText = `총 ${lottoCnt}개를 구매하였습니다.`
  const lottoImgList = Array.from({ length: lottoCnt }, () => DOM_ELEMENT.lottoImg)
  render(selectors.listLotto, lottoImgList)
}

export const showLottoList = (lottoList) => {
  const imgWithNumber = lottoList.map((lotto) => `<span style="font-size:15px">🎟️ ${lotto}</span>`)
  selectors.listLotto.style = 'flex-direction: column;align-items: flex-start;'
  render(selectors.listLotto, imgWithNumber)
}

export const onClickToggle = (lottoList) => {
  const isCheck = selectors.toggle.checked
  isCheck ? showLottoList(lottoList) : updateLottoState(lottoList.length)
}

const updateResultData = (winningNumberList, rate) => {
  Array.from(selectors.resultCellList).forEach((cell, idx) => (cell.innerHTML = winningNumberList[idx]))
  selectors.resultRate.innerHTML = `당신의 총 수익률은 ${rate || 0}% 입니다.`
}

export const showModal = (winningNumberCnt, rate) => {
  const tempWinningNumberArray = Object.values(winningNumberCnt)

  selectors.resultModal.classList.add('open')
  updateResultData(tempWinningNumberArray, rate)
}

export const closeModal = () => selectors.resultModal.classList.remove('open')

export const resetState = () => {
  updateLottoState(0)
  updateResultData([0, 0, 0, 0, 0], 0)

  selectors.inputPurchaseAmount.value = ''
  selectors.inputBonusNumber.value = ''
  Array.from(selectors.inputWinningNumber).forEach((input) => (input.value = ''))
  closeModal()
}
