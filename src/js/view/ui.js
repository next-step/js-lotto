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
  modalResultTr,
} from './Element.js';
import { buy } from '../util/LottoBuyer.js';
import { setLottoNumberToggle, setTickets } from './Ticket.js';
import { isNumber, isUniqueNumbers, isWithInRangedNumber } from '../util/Validator.js';
import { MESSAGE, TICKET_PRICE } from '../util/Constant.js';
import { getLottoResults, getMyEarningRate, getMyPrizeAmount } from '../util/LottoResult.js';

let tickets = [];

const getNumbers = (arr = []) => arr.map(Number);

const isEmptyNumberFields = (inputNumbers = []) => {
  return inputNumbers.some((s) => s === '');
};

const validateNumbers = (inputNumbers = []) => {
  if (isEmptyNumberFields(inputNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_MODAL);
  }
  const winningNumbers = getNumbers(inputWinningNumbers).slice(0, 6);
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
  return getLottoResults(tickets, winningNumbers, bonusNumber);
};

const updateLottoResult = (lottoResult) => {
  // 모듈 글자 렌더링하기
  const getSelector = (selectorName) => `${selectorName} > td.p-3:last-child`;
  const updateText = (selector, text) => (document.querySelector(selector).innerText = text);

  const keys = Object.keys(lottoResult);
  for (const key of keys) {
    const selector = getSelector(modalResultTr[key]);
    updateText(selector, lottoResult[key] + '개');
  }

  // 수익률 계산하기
  $earningRate.innerText = getMyEarningRate(tickets.length * TICKET_PRICE, getMyPrizeAmount(lottoResult)) + '%';
};

// TODO: modalShow에서 너무 많은 일을 하고 있음
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

const onTicketsBought = () => {
  try {
    const purchasingAmount = $purchasingAmountInput.value;
    validatePurchasingAmount(purchasingAmount);
    tickets = buy(parseInt(purchasingAmount));
    setTickets(tickets);
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
  $confirmButton.addEventListener('click', onTicketsBought);
  $lottoNumbersToggleButton.addEventListener('click', setLottoNumberToggle);

  $showResultButton.addEventListener('click', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
}
