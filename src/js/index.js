import { isValidateAmount } from './utils/validator.js';
import { purchaseLotto } from './utils/common.js';
import { ERROR_MSSAGE } from './utils/constants.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
const $purchaseButton = document.querySelector('.purchase-button');
const $purchaseInput = document.querySelector('.purchase-amount');

const $purchasedLottos = document.querySelector('#purchased-lottos');
const $inputLottoNums = document.querySelector('#input-lotto-nums');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const onPurchaseLotto = () => {
  const purchaseAmount = $purchaseInput.value;
  if (!isValidateAmount(purchaseAmount)) {
    alert(ERROR_MSSAGE.AMOUNT);
    return;
  }
  const ticketCount = purchaseLotto(purchaseAmount);
  $purchasedLottos.style.display = 'block';
  $inputLottoNums.style.display = 'block';
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$purchaseButton.addEventListener('click', onPurchaseLotto);
