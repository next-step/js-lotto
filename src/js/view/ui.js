import { MODAL_RESULT_TR, MODAL_RESULT_TR_COLUMN } from './Element.js';
import {
  $bonusNumber,
  $confirmButton,
  $earningRate,
  $lottoNumbersToggleButton,
  $modal,
  $modalClose,
  $purchasingAmountInput,
  $resultAreas,
  $showResultButton,
  $winningNumbers,
} from './Selector.js';
import { buy } from '../util/LottoBuyer.js';
import { setLottoNumberToggle, setLottos } from './Lotto.js';
import { isNumber, isUniqueNumbers, isWithInRangedNumber } from '../util/Validator.js';
import { MESSAGE, LOTTO_PRICE } from '../util/Constant.js';
import { getLottoResults, getMyEarningRate, getMyPrizeAmount } from '../util/LottoResult.js';

let lottos = [];

const getNumbers = (arr = []) => arr.map(Number);

const isEmptyNumberFields = (inputNumbers = []) => {
  return inputNumbers.some((s) => s === '');
};

const validateNumbers = (inputNumbers = []) => {
  if (isEmptyNumberFields(inputNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_MODAL);
  }
  const winningNumbers = getNumbers(inputNumbers).slice(0, 6);
  if (!isUniqueNumbers(winningNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_NUMBER_DUPLICATED);
  }
  if (!isWithInRangedNumber(winningNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_NUMBER_RANGE);
  }
};

const getMyLottoResult = () => {
  const inputWinningNumbers = Array.from($winningNumbers).map(($number) => $number.value);
  const inputBonusNumber = $bonusNumber.value;
  validateNumbers([...inputWinningNumbers, inputBonusNumber]);

  const winningNumbers = getNumbers(inputWinningNumbers);
  const bonusNumber = parseInt(inputBonusNumber);
  return getLottoResults(lottos, winningNumbers, bonusNumber);
};

const updateLottoResult = (lottoResult) => {
  // 모듈 글자 렌더링하기
  const getSelector = (selectorName) => `${selectorName} > td.${MODAL_RESULT_TR_COLUMN}:last-child`;
  const updateText = (selector, text) => (document.querySelector(selector).innerText = text);

  const keys = Object.keys(lottoResult);
  for (const key of keys) {
    const selector = getSelector(MODAL_RESULT_TR[key]);
    updateText(selector, lottoResult[key] + '개');
  }

  // 수익률 계산하기
  $earningRate.innerText = getMyEarningRate(lottos.length * LOTTO_PRICE, getMyPrizeAmount(lottoResult)) + '%';
};

const onModalShow = () => {
  try {
    updateLottoResult(getMyLottoResult());
    $modal.classList.add('open');
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const onLottosBought = () => {
  try {
    const purchasingAmount = $purchasingAmountInput.value;
    validatePurchasingAmount(purchasingAmount);
    lottos = buy(parseInt(purchasingAmount));
    setLottos(lottos);
    $resultAreas.forEach(($el) => $el.classList.remove('hidden'));
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

const validatePurchasingAmount = (s) => {
  if (!isNumber(s) || Number(s) < 1000) {
    console.log(s);
    throw new Error(MESSAGE.INVALID_AMOUNT_MIN);
  }
};

export function initialize() {
  $resultAreas.forEach(($el) => $el.classList.add('hidden'));
  $confirmButton.addEventListener('click', onLottosBought);
  $lottoNumbersToggleButton.addEventListener('click', setLottoNumberToggle);

  $showResultButton.addEventListener('click', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
}
