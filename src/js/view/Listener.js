import { LOTTO_NUMBER, LOTTO_PRICE } from '../service/Constant.js';
import { buy, getLottoInfo } from '../service/LottoBuyer.js';
import { AUTO_N_MESSAGE, ENTER_KEY, MESSAGE } from '../util/Constant.js';
import { isNumber, validateNumbers, validatePurchasingAmount } from '../util/Validator.js';
import { setVisibleAreas } from './Element.js';
import { setLottos } from './Lotto.js';
import { getMyLottoResult, updateLottoResult } from './LottoResult.js';
import {
  appendLottoNumberInputs,
  getCountOfBuyingManually,
  getLottoManualNumberLottos,
  truncateLottoNumberInput,
} from './ManualInput.js';
import {
  $autoPurchasingInformationPhrase,
  $modal,
  $purchasingAmountInput,
  $purchasingManuallyForm,
  $resultAreas,
} from './Selector.js';

/**
 * @param {number[]} lottos
 */
export const onModalShow = (lottos) => {
  try {
    updateLottoResult(lottos, getMyLottoResult(lottos));
    $modal.classList.add('open');
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

export const onModalClose = () => {
  $modal.classList.remove('open');
};

export const onLottoRestart = () => {
  $purchasingAmountInput.value = '';
  setVisibleAreas($resultAreas, false);
  onModalClose();
};

export const onPurchasingAmountEntered = (event) => {
  if (event.key === ENTER_KEY) {
    onPurchasingAmount();
    event.preventDefault();
  }
};

export const onPurchasingAmount = () => {
  try {
    const purchasingAmount = $purchasingAmountInput.value;
    if (purchasingAmount % LOTTO_PRICE) throw new Error(MESSAGE.INVALID_AMOUNT_UNIT);
    validatePurchasingAmount(purchasingAmount);
    setVisibleAreas($purchasingManuallyForm, true);
    truncateLottoNumberInput();
    $autoPurchasingInformationPhrase.innerText = AUTO_N_MESSAGE(purchasingAmount / LOTTO_PRICE);
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

export const onManualAdd = () => {
  const purchasingAmount = $purchasingAmountInput.value;
  const { total, manual, auto } = getLottoInfo(purchasingAmount, getCountOfBuyingManually());

  if (total - manual <= 0) {
    alert(MESSAGE.EXCEEDED_MANUAL_LOTTO);
    return;
  }
  appendLottoNumberInputs();
  $autoPurchasingInformationPhrase.innerText = AUTO_N_MESSAGE(auto - 1);
};

export const onLottosBought = () => {
  try {
    // 로또 구매 로직
    const manualNumberLottos = getLottoManualNumberLottos();
    manualNumberLottos.forEach((manualNumber) => validateNumbers(manualNumber));
    const purchasingAmount = $purchasingAmountInput.value;
    const lottos = buy(parseInt(purchasingAmount), manualNumberLottos);
    setLottos(lottos);
    setVisibleAreas($resultAreas);
    return lottos;
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

export const onLottoNumberInput = function (event) {
  const key = Number(event.key);
  if (!(!isNaN(key) && key >= LOTTO_NUMBER.MIN && this.value.length < String(LOTTO_NUMBER.MAX).length)) {
    event.preventDefault();
    return;
  }
};
