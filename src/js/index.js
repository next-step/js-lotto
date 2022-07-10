import LottoSheet from './LottoSheet.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

// --
const lottoSheetForm = document.querySelector('.lotto-sheet-form');
const lottoPriceInput = document.querySelector('.lotto-price-input');

LottoSheet({
  form: lottoSheetForm,
  input: lottoPriceInput,
});
