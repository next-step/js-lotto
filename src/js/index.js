import { handlePurchaseClick } from './purchase.js';
import { handleToggleClick } from './purchased-lotto-section.js';
import { EVENT, ENTER_KEYCODE } from './constants.js';

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

$showResultButton.addEventListener(EVENT.CLICK, onModalShow);
$modalClose.addEventListener(EVENT.CLICK, onModalClose);

$purchaseAmountInput.addEventListener(EVENT.KEYDOWN, ev => {
  if (ev.keyCode === ENTER_KEYCODE) {
    ev.preventDefault();
    handlePurchaseClick(ev);
  }
});

$purchaseAmountSubmitButton.addEventListener(EVENT.CLICK, handlePurchaseClick);

$lottoNumbersToggleButton.addEventListener(EVENT.CLICK, handleToggleClick);
