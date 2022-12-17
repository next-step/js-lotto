import { validateWithMsg } from '../../util/validate.js'
import { ERROR_TEXT, LOTTO_MACHINE_CONFIG, LOTTO_REVENUE_PRICE } from './lotto.constant.js'
import selectors from './lotto.selector.js'
import { Lotto } from './lotto.store.js'
import { closeModal, onClickToggle, resetState, showModal, updateLottoState } from './lotto.view.js'

const lotto = new Lotto()
lotto.init(LOTTO_MACHINE_CONFIG)

selectors.inputWinningNumber.forEach((input) => {
  input.min = LOTTO_MACHINE_CONFIG.numberMin
  input.max = LOTTO_MACHINE_CONFIG.numberMax
  input.addEventListener('keyup', (e) => {
    const value = Number(e.target.value)
    if (0 !== value && value < LOTTO_MACHINE_CONFIG.numberMin) return (e.target.value = LOTTO_MACHINE_CONFIG.numberMin)
    if (value > LOTTO_MACHINE_CONFIG.numberMax) return (e.target.value = LOTTO_MACHINE_CONFIG.numberMax)
  })
})

selectors.formBuy.addEventListener('submit', (e) => {
  e.preventDefault()
  const purchaseAmount = Number(e.target.elements['price'].value)
  if (
    validateWithMsg(
      purchaseAmount,
      (paidAmount) => paidAmount % LOTTO_MACHINE_CONFIG['price'] !== 0,
      `${LOTTO_MACHINE_CONFIG.price}${ERROR_TEXT.INVALID_PURCHASE_AMOUNT}`
    )
  )
    return
  lotto.issue(purchaseAmount)
})

selectors.formCheck.addEventListener('submit', (e) => {
  e.preventDefault()
  const enteredNumberList = Array.from(selectors.inputWinningNumber, (target) => Number(target.value))
  const enteredBonusNumber = Number(selectors.inputBonusNumber.value)
  const set = new Set([...enteredNumberList, enteredBonusNumber])
  if (!validateWithMsg(set.size, (size) => size < 7, '각 당첨 번호와 보너스 번호를 다르게 입력해주세요.')) return

  const winningLottoList = lotto.getLottoList()
  const winningNumberCnt = lotto.getWinningNumberCnt(enteredNumberList, winningLottoList, enteredBonusNumber)

  const purchaseAmount = selectors.inputPurchaseAmount.value
  const revenue = getRevenue(winningNumberCnt, LOTTO_REVENUE_PRICE)
  const rate = getRate(purchaseAmount, revenue)

  showModal(winningNumberCnt, rate)
})

const getRevenue = (entered, unit) => {
  const revenue = Object.keys(entered)
    .map((key) => entered[key] * unit[key])
    .reduce((a, b) => a + b)
  return revenue
}
const getRate = (entered, revenue) => Math.floor(revenue / entered)

lotto.registerObserver(updateLottoState)

selectors.toggle.addEventListener('click', () => onClickToggle(lotto.getLottoList()))
selectors.btnCloseResult.addEventListener('click', closeModal)
selectors.resetState.addEventListener('click', resetState)
