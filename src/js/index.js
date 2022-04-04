import { $ } from './utils/selector.js';
import { clickLottoNumbersToggle, purchaseLotto } from './controller/purchaseController.js';

const $showResultButton = $('.open-result-modal-button');
const $modalClose = $('.modal-close');
const $modal = $('.modal');
const $purchaseForm = $('.input-purchase-form');
const $lottoToggle = $('#lotto-numbers-toggle');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

$purchaseForm.addEventListener('submit', purchaseLotto);
$lottoToggle.addEventListener('click', clickLottoNumbersToggle);
