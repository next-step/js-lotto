import { LOTTO_MACHINE_CONFIG } from '../constant.js'
import { checkPaidAmount } from '../helper/validate.js'
import { lottoMachine } from '../index.js'
import Selectors from '../selector.js'

let lottoList = []

const updateLottoState = () => {
  const { length } = lottoList
  Selectors.labelBuyCnt.innerText = `총 ${length}개를 구매하였습니다.`

  Selectors.toggleLottoNumbers.checked ? showLottoNumbers() : showLottoImgs()
}

const toggleAction = {
  showLottoImgs: () => {
    const lottoImg = `<span class="mx-1 text-4xl">🎟️ </span>`
    Selectors.listLotto.innerText = ''
    for (let i = 0; i < lottoList.length; i++) {
      Selectors.listLotto.insertAdjacentHTML('beforeend', lottoImg)
    }
  },

  showLottoNumbers: () => {
    Selectors.listLotto.innerText = ''
    lottoList.forEach((lotto) => {
      const lottoElement = `<div class='lotto' style='width: 100%;'>🎟️ ${lotto.join(', ')}</div>`
      Selectors.listLotto.insertAdjacentHTML('beforeend', lottoElement)
    })
  },
}

const buyLotto = () => {
  const purchaseAmount = Selectors.inputPurchaseAmount.value

  if (!purchaseAmount) return alert('구입 금액을 입력해주세요.')

  if (!checkPaidAmount(purchaseAmount, LOTTO_MACHINE_CONFIG.price))
    return alert(`${LOTTO_MACHINE_CONFIG.price}원 단위로 구매 가능합니다.`)

  lottoList = lottoMachine.issue(purchaseAmount)

  updateLottoState()
}

const clickToggle = () => (Selectors.toggleLottoNumbers.checked ? toggleAction.showLottoNumbers() : toggleAction.showLottoImgs())

Selectors.btnBuy.addEventListener('click', buyLotto)
Selectors.toggleLottoNumbers.addEventListener('click', clickToggle)
