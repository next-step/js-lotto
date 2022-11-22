import { ERROR_TEXT, LOTTO_MACHINE_CONFIG } from '../lotto.constant.js'
import selectors from '../lotto.selector.js'
import { showLottoList, updateLottoState } from './lotto.view.js'
import { checkPaidAmount } from '../../../helper/validate.js'
import { LottoModel } from './lotto.model.js'

const lottoModel = new LottoModel(LOTTO_MACHINE_CONFIG).init()

const issueLotto = (purchaseAmount) => lottoModel.issue(purchaseAmount).getLottoList()
const getLottoList = () => lottoModel.getLottoList()
const getPurchaseAmount = () => selectors.inputPurchaseAmount.value

const buyLotto = (purchaseAmount) => {
  if (purchaseAmount === '') return alert(ERROR_TEXT.EMPTY_PURCHASE_AMOUNT)
  if (!checkPaidAmount(purchaseAmount, LOTTO_MACHINE_CONFIG.price))
    return alert(`${LOTTO_MACHINE_CONFIG.price}${ERROR_TEXT.INVALID_PURCHASE_AMOUNT}`)

  const lottoList = issueLotto(purchaseAmount)
  updateLottoState(lottoList.length)
}

const clickToggle = (e) => {
  const state = e.target.checked
  const lottoList = getLottoList()
  state ? showLottoList(lottoList) : updateLottoState(lottoList.length)
}

selectors.btnBuy.addEventListener('click', () => buyLotto(getPurchaseAmount()))
selectors.toggleLottoNumbers.addEventListener('click', clickToggle)
