import { $ } from './DOM.js';
import handleLottoNumbersToggle from './handleLottoNumbersToggle.js';
import confirmPurchaseLotto from './purchaseLotto.js';

const $purchaseConfirmButton = $('.confirm');
const $showResultButton = $('.open-result-modal-button');
const $modalClose = $('.modal-close');
const $modal = $('.modal');
const $lottoNumbersToggleButton = $('.lotto-numbers-toggle-button');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const init = () => {
  $showResultButton.addEventListener('click', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
  $purchaseConfirmButton.addEventListener('click', confirmPurchaseLotto);
  $lottoNumbersToggleButton.addEventListener('click', handleLottoNumbersToggle);
};

window.onload = () => {
  init();
};
