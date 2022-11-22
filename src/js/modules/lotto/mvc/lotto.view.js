import { DOM_ELEMENT } from '../lotto.constant.js'
import selectors from '../lotto.selector.js'

export const showLottoList = (lottoList) =>
  lottoList.forEach((lotto, idx) => {
    selectors.lottoImgList[idx].insertAdjacentHTML('beforeend', `<span style="font-size:15px">${lotto}</span>`)
    selectors.listLotto.style = `
      flex-direction: column;
      align-items: flex-start;
    `
  })

export const updateLottoState = (lottoCnt) => {
  selectors.toggleLottoNumbers.checked = false
  selectors.listLotto.innerText = ''
  selectors.listLotto.style = ``

  selectors.labelBuyCnt.innerText = `총 ${lottoCnt}개를 구매하였습니다.`
  new Array(lottoCnt).fill().forEach(() => selectors.listLotto.insertAdjacentHTML('beforeend', DOM_ELEMENT.lottoImg))
}
