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
import { isUniqueNumbers, isWithInRangedNumber } from '../util/Validator.js';
import { MESSAGE, TICKET_PRICE } from '../util/Constant.js';
import { getLottoResults, getMyEarningRate, getMyPrizeAmount } from '../util/LottoResult.js';

let tickets = [];

const isEmptyNumberFields = (inputNumbers = []) => {
  return inputNumbers.some((s) => s === '');
};

const validateNumbers = (inputWinningNumbers = []) => {
  const winningNumbers = inputWinningNumbers.map((s) => parseInt(s));
  if (!isUniqueNumbers(winningNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_NUMBER_DUPLICATED);
  }
  if (!isWithInRangedNumber(winningNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_NUMBER_RANGE);
  }
};

// TODO: modalShow에서 너무 많은 일을 하고 있음
const onModalShow = () => {
  try {
    // 모달 띄우기 전 유효성 검사 (TODO: 역할 분리)
    const inputWinningNumbers = [];
    const inputBonusNumber = $bonusNumber.value;
    $winningNumbers.forEach(($number) => inputWinningNumbers.push($number.value));
    if (isEmptyNumberFields(inputWinningNumbers)) {
      throw new Error(MESSAGE.EMPTY_WINNING_NUMBER);
    }
    if (isEmptyNumberFields([inputBonusNumber])) {
      throw new Error(MESSAGE.EMPTY_BONUS_NUMBER);
    }
    validateNumbers([...inputWinningNumbers, inputBonusNumber]);

    const winningNumbers = inputWinningNumbers.map((s) => parseInt(s));
    const bonusNumber = parseInt(inputBonusNumber);
    const lottoResult = getLottoResults(tickets, winningNumbers, bonusNumber);

    // 모듈 글자 렌더링하기
    const keys = Object.keys(lottoResult);
    for (const key of keys) {
      const selector = `${modalResultTr[key]} > td.p-3:last-child`;
      document.querySelector(selector).innerText = lottoResult[key] + '개';
    }

    // 수익률 계산하기
    $earningRate.innerText = getMyEarningRate(tickets.length * TICKET_PRICE, getMyPrizeAmount(lottoResult)) + '%';

    // 모듈 띄우기 (본 역할)
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
    tickets = buy(parseInt(purchasingAmount));
    setTickets(tickets);
    $resultAreas.forEach(($el) => $el.classList.remove('hidden'));
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

export function initialize() {
  $resultAreas.forEach(($el) => $el.classList.add('hidden'));
  $confirmButton.addEventListener('click', onTicketsBought);
  $lottoNumbersToggleButton.addEventListener('click', setLottoNumberToggle);

  $showResultButton.addEventListener('click', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
}
