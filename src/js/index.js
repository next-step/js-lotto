import LottoMachine from './lotto-machine.js';
import { lottoElement } from './element/index.js';

const $app = document.querySelector('#app');
const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
const $paidAmount = document.querySelector('#paid-amount');
const $formLottoBuying = document.querySelector('#form-lotto-buying');
const $purchasedLottoList = document.querySelector('#purchased-lotto');
const $lottoCount = document.querySelector('#lotto-count');

const lottoMachine = new LottoMachine(1000);

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const onLottoNumberToggle = ({ target: { checked } }) => {
  const className = 'visible-number';
  if (checked) {
    $purchasedLottoList.classList.add(className);
  } else {
    $purchasedLottoList.classList.remove(className);
  }
};

const appendLottoEl = (lottos) => {
  while ($purchasedLottoList.hasChildNodes()) {
    $purchasedLottoList.removeChild($purchasedLottoList.firstChild);
  }

  lottos.forEach((item) => {
    const number = item.numbers.join(', ');
    $purchasedLottoList.append(lottoElement(number));
  });
};

const appendLottoCountEl = (numberOfLotto) => {
  $lottoCount.textContent = numberOfLotto;
};

const showContent = () => {
  $app.classList.add('visible-content');
};

const onSubmitLottoBuying = (event) => {
  event.preventDefault();
  lottoMachine.generateLottoTicketByAutomatic($paidAmount.value);
  const lottos = lottoMachine.lottoTickets;
  appendLottoEl(lottos);
  appendLottoCountEl(lottos.length);
  showContent();
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$lottoNumbersToggleButton.addEventListener('change', onLottoNumberToggle);
$formLottoBuying.addEventListener('submit', onSubmitLottoBuying);
