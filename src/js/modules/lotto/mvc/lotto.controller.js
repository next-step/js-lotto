import { ERROR_TEXT, LOTTO_MACHINE_CONFIG, LOTTO_REVENUE_PRICE } from '../lotto.constant.js'
import selectors from '../lotto.selector.js'
import { closeModal, resetState, showLottoList, showModal, updateLottoState } from './lotto.view.js'
import { checkPaidAmount } from '../../../helper/validate.js'
import { LottoModel } from './lotto.model.js'
import { getRate, getRevenue, getValueList, getWinningNumberCnt } from '../../../helper/calc.js'

const lottoModel = new LottoModel(LOTTO_MACHINE_CONFIG).init()

const issueLotto = (purchaseAmount) => lottoModel.issue(purchaseAmount).getLottoList()
const getLottoList = () => lottoModel.getLottoList()
const getPurchaseAmount = () => selectors.inputPurchaseAmount.value


const onBuyLotto = (purchaseAmount) => {
  if (purchaseAmount === '') return alert(ERROR_TEXT.EMPTY_PURCHASE_AMOUNT)
  if (!checkPaidAmount(purchaseAmount, LOTTO_MACHINE_CONFIG.price))
    return alert(`${LOTTO_MACHINE_CONFIG.price}${ERROR_TEXT.INVALID_PURCHASE_AMOUNT}`)

  const lottoList = issueLotto(purchaseAmount)
  updateLottoState(lottoList.length)
}

const onClickToggle = (e) => {
  const state = e.target.checked
  const lottoList = getLottoList()
  state ? showLottoList(lottoList) : updateLottoState(lottoList.length)
}


const onGetResult = () => {
  const enteredNumberList = getValueList(selectors.inputWinningNumber)
  const winningLottoList = getLottoList()

  const enteredBonusNumber = Number(selectors.inputBonusNumber.value)
  const winningNumberCnt = getWinningNumberCnt(enteredNumberList, winningLottoList, enteredBonusNumber)

  const revenue = getRevenue(winningNumberCnt, LOTTO_REVENUE_PRICE)
  const purchaseAmount = getPurchaseAmount()
  const rate = getRate(purchaseAmount, revenue)

  showModal(winningNumberCnt, rate)
}

selectors.btnBuy.addEventListener('click', () => onBuyLotto(getPurchaseAmount()))
selectors.toggleLottoNumbers.addEventListener('click', onClickToggle)
selectors.btnShowResult.addEventListener('click', onGetResult)
selectors.btnCloseResult.addEventListener('click', closeModal)
selectors.resetState.addEventListener('click', resetState)
