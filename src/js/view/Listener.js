import { LOTTO_NUMBER, LOTTO_PRICE } from '../service/Constant.js';
import { buy, getLottoInfo } from '../service/LottoBuyer.js';
import { ValidationError } from '../service/ValidationError.js';
import { AUTO_N_MESSAGE, ENTER_KEY, MESSAGE } from '../util/Constant.js';
import { validateNumbers, validatePurchasingAmount } from '../util/Validator.js';
import { setVisibleAreas } from './Element.js';
import { setLottoNumberToggle, setLottos } from './Lotto.js';
import { getMyLottoResult, updateLottoResult } from './LottoResult.js';
import {
  appendLottoNumberInputs,
  getCountOfBuyingManually,
  getLottoManualNumberLottos,
  truncateLottoNumberInput,
} from './ManualInput.js';
import {
  $autoPurchasingInformationPhrase,
  $confirmButton,
  $lottoNumbersToggleButton,
  $manualAddButton,
  $modal,
  $modalClose,
  $purchasingAmountInput,
  $purchasingManuallyForm,
  $restart,
  $resultAreas,
  $showResultButton,
  $startButton,
  $winningNumbers,
} from './Selector.js';

/**
 *
 * @param {function} callback
 */
export const validationErrorHandler = (callback) => {
  try {
    return callback();
  } catch (error) {
    if (error instanceof ValidationError) {
      alert(error.message);
      return;
    }
    console.error(error);
  }
};

/**
 *
 * @param {HTMLElement} selector
 * @param {function} callback
 * @returns
 */
export const setClickListener = (selector, callback) => {
  selector.addEventListener('click', () => validationErrorHandler(callback));
};

export const setEnterListener = (selector, callback) => {
  selector.addEventListener(
    'keypress',
    /**
     *
     * @param {KeyboardEvent} event
     */
    (event) => {
      if (event.key === ENTER_KEY) {
        validationErrorHandler(callback);
        event.preventDefault();
      }
    }
  );
};

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

export const onPurchasingAmount = () => {
  validationErrorHandler(() => {
    const purchasingAmount = $purchasingAmountInput.value;
    if (purchasingAmount % LOTTO_PRICE) throw new ValidationError(MESSAGE.INVALID_AMOUNT_UNIT);
    validatePurchasingAmount(purchasingAmount);
    setVisibleAreas($purchasingManuallyForm, true);
    truncateLottoNumberInput();
    $autoPurchasingInformationPhrase.innerText = AUTO_N_MESSAGE(purchasingAmount / LOTTO_PRICE);
  });
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

export const onLottosBought = () =>
  validationErrorHandler(() => {
    // 로또 구매 로직
    const manualNumberLottos = getLottoManualNumberLottos();
    manualNumberLottos.forEach((manualNumber) => validateNumbers(manualNumber));
    const purchasingAmount = $purchasingAmountInput.value;
    const lottos = buy(parseInt(purchasingAmount), manualNumberLottos);
    setLottos(lottos);
    setVisibleAreas($resultAreas);
    return lottos;
  });

export const onLottoNumberInput = function (event) {
  const key = Number(event.key);
  if (!(!isNaN(key) && this.value.length < String(LOTTO_NUMBER.MAX).length)) {
    event.preventDefault();
    return;
  }
};

/**
 *
 * @param {number[]} lottos
 */
export const setListeners = (lottos) => {
  $winningNumbers.forEach((input) => input.addEventListener('keypress', onLottoNumberInput));
  setEnterListener($purchasingAmountInput, onPurchasingAmount);
  setClickListener($startButton, onPurchasingAmount);
  setClickListener($manualAddButton, onManualAdd);
  setClickListener($lottoNumbersToggleButton, setLottoNumberToggle);
  setClickListener($confirmButton, () => {
    lottos = onLottosBought();
  });
  setClickListener($showResultButton, () => onModalShow(lottos));
  setClickListener($modalClose, onModalClose);
  setClickListener($restart, onLottoRestart);
};
