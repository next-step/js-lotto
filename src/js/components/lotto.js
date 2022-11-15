import { LOTTO_MACHINE_CONFIG } from '../constant.js'
import { checkPaidAmount } from '../helper/validate.js'
import { lottoMachine } from '../index.js'
import Selectors from '../selector.js'

let lottoList = []

const buyLotto = () => {
  // 금액 확인
  const purchaseAmount = Selectors.inputPurchaseAmount.value

  // input이 비어있을 때
  if (!purchaseAmount) return alert('구입 금액을 입력해주세요.')

  // input이 유효하지 않을 때
  if (!checkPaidAmount(purchaseAmount, LOTTO_MACHINE_CONFIG.price))
    return alert(`${LOTTO_MACHINE_CONFIG.price}원 단위로 구매 가능합니다.`)

  // input이 유효할 때 발행
  lottoList = lottoMachine.issue(purchaseAmount)

  updateLottoState()
}

const updateLottoState = () => {
  const { length } = lottoList
  Selectors.labelBuyCnt.innerText = `총 ${length}개를 구매하였습니다.`

  Selectors.toggleLottoNumbers.checked ? showLottoNumbers() : showLottoImgs()
}

// toggle이 false일 때
const showLottoImgs = () => {
  const lottoImg = `<span class="mx-1 text-4xl">🎟️ </span>`
  Selectors.listLotto.innerText = ''
  for (let i = 0; i < lottoList.length; i++) {
    Selectors.listLotto.insertAdjacentHTML('beforeend', lottoImg)
  }
}

// toggle이 true일 때
const showLottoNumbers = () => {
  Selectors.listLotto.innerText = ''
  lottoList.forEach((lotto) => {
    const lottoElement = `<div style='width: 100%;'>🎟️ ${lotto.join(', ')}</div>`
    Selectors.listLotto.insertAdjacentHTML('beforeend', lottoElement)
  })
}

// toggle의 동작
const clickToggle = () => (Selectors.toggleLottoNumbers.checked ? showLottoNumbers() : showLottoImgs())

Selectors.btnBuy.addEventListener('click', buyLotto)
Selectors.toggleLottoNumbers.addEventListener('click', clickToggle)
