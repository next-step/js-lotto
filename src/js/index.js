import LottoMachine from './model/lotto-machine.js';
import {
  onLottoNumberToggle,
  appendLottoEl,
  appendLottoCountEl,
  showContent,
} from './ui/purchased-content.js';

export const $showResultButton = document.querySelector(
  '.open-result-modal-button'
);
export const $modalClose = document.querySelector('.modal-close');
export const $modal = document.querySelector('.modal');
export const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
export const $paidAmount = document.querySelector('#paid-amount');
export const $formLottoBuying = document.querySelector('#form-lotto-buying');

const lottoMachine = new LottoMachine(1000);

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const onSubmitLottoBuying = (event) => {
  event.preventDefault();
  lottoMachine.generateLottoTicketByAutomatic($paidAmount.value);
  if (lottoMachine.isPurchasedLottoTickets()) {
    const lottos = lottoMachine.lottoTickets;
    appendLottoEl(lottos);
    appendLottoCountEl(lottos.length);
    showContent();
  }
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$lottoNumbersToggleButton.addEventListener('change', onLottoNumberToggle);
$formLottoBuying.addEventListener('submit', onSubmitLottoBuying);
