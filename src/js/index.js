import LottoMachine from './model/lotto-machine.js';
import {
  onLottoNumberToggle,
  appendLottoEl,
  appendLottoCountEl,
  showContent,
  hideContent,
  offLottoNumberToggle,
} from './ui/purchased-content.js';
import {
  appendResultWinningCount,
  appendRateOfReturn,
} from './ui/result-content.js';

export const $modalClose = document.querySelector('.modal-close');
export const $modal = document.querySelector('.modal');
export const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
export const $formLottoBuying = document.querySelector('#form-lotto-buying');
export const $formWinningNumbers = document.querySelector('#result');
export const $reset = document.querySelector('#reset');

const lottoMachine = new LottoMachine();

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const onSubmitLottoBuying = (event) => {
  event.preventDefault();

  const INPUT_NAME = 'paid-amount';
  const paidAmountValue = new FormData(event.target).get(INPUT_NAME);

  try {
    lottoMachine.generateLottoTicketByAutomatic(paidAmountValue);
  } catch (e) {
    alert(e.message);
    return;
  }

  if (lottoMachine.isPurchasedLottoTickets()) {
    const lottos = lottoMachine.lottoTickets;
    appendLottoEl(lottos);
    appendLottoCountEl(lottos.length);
    showContent();
  }
};

const onSubmitLottoResult = (event) => {
  event.preventDefault();

  const INPUT_WINNING_NUMBER = 'winning-number';
  const INPUT_BONUS_NUMBER = 'bonus-number';
  const winningNumbers = new FormData(event.target).getAll(
    INPUT_WINNING_NUMBER
  );
  const bonusNumber = new FormData(event.target).get(INPUT_BONUS_NUMBER);

  try {
    const result = lottoMachine.getResult(winningNumbers, bonusNumber);
    appendResultWinningCount(result.rankObj);
    appendRateOfReturn(result.calcRateOfReturn());
  } catch (e) {
    alert(e.message);
    return;
  }

  onModalShow();
};

const resetLottoNumberToggle = () => {
  if ($lottoNumbersToggleButton.checked) {
    $lottoNumbersToggleButton.checked = '';
    offLottoNumberToggle();
  }
};

const onResetForm = () => {
  $formLottoBuying.reset();
  $formWinningNumbers.reset();
  lottoMachine.reset();
  resetLottoNumberToggle();
  hideContent();
  onModalClose();
};

$modalClose.addEventListener('click', onModalClose);
$lottoNumbersToggleButton.addEventListener('change', onLottoNumberToggle);
$formLottoBuying.addEventListener('submit', onSubmitLottoBuying);
$formWinningNumbers.addEventListener('submit', onSubmitLottoResult);
$reset.addEventListener('click', onResetForm);
