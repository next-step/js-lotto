import { isValidForNoAmount, isValidForExactAmount } from './validators.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');
const $purchaseAmountInput = document.querySelector('#purchaseAmount');
const $purchaseButton = document.querySelector('#purchaseButton');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const onPurchaseClick = () => {
  const purchasedAmount = $purchaseAmountInput.value;
  if (!isValidForNoAmount(purchasedAmount)) {
    alert('반드시 값을 입력해주세요!');
    return;
  }
  if (!isValidForExactAmount(purchasedAmount)) {
    alert('로또 한 장의 단위는 1000원 입니다.');
    return;
  }
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$purchaseButton.addEventListener('click', onPurchaseClick);
