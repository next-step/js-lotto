import { handlePurchaseClick } from './purchase.js';
import { handleToggleClick } from './purchased-lotto-section.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
const $purchaseAmountInput = document.querySelector('#purchase-amount');
const $purchaseAmountSubmitButton = document.querySelector(
  '#purchase-amount-submit'
);

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

$purchaseAmountInput.addEventListener('keydown', ev => {
  if (ev.keyCode === 13) {
    ev.preventDefault();
    handlePurchaseClick(ev);
  }
});

$purchaseAmountSubmitButton.addEventListener('click', handlePurchaseClick);

$lottoNumbersToggleButton.addEventListener('click', handleToggleClick);
