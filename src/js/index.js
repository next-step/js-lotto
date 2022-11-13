import { isValidForNoAmount, isValidForExactAmount } from './validators.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');
const $purchaseAmountInput = document.querySelector('#purchaseAmount');
const $purchaseButton = document.querySelector('#purchaseButton');
const $purchasedLottoList = document.querySelector('#purchasedLottoList');
const $winningNumberInputs = document.querySelector('#winningNumberInputs');
const $totalQuantity = document.querySelector('#totalQuantity');
const lottoState = {
  purchasedAmount: 0,
  quantity: 0,
  lottos: [],
};

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const onPurchaseClick = (e) => {
  e.preventDefault();
  const purchasedAmount = $purchaseAmountInput.value;
  if (!isValidForNoAmount(purchasedAmount)) {
    alert('반드시 값을 입력해주세요!');
    return;
  }
  if (!isValidForExactAmount(purchasedAmount)) {
    alert('로또 한 장의 단위는 1000원 입니다.');
    return;
  }
  lottoState.purchasedAmount = purchasedAmount;
  lottoState.quantity = Number(purchasedAmount) / 1000;
  displayDetails();
  $totalQuantity.innerText = lottoState.quantity;
const displayDetails = () => {
  if (!lottoState.quantity) {
    $purchasedLottoList.style.display = 'none';
    $winningNumberInputs.style.display = 'none';
    return;
  }
  $purchasedLottoList.style.display = 'block';
  $winningNumberInputs.style.display = 'block';
};
};

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$purchaseButton.addEventListener('click', onPurchaseClick);
displayDetails();
