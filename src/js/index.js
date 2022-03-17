import { LottoVendingMachine } from './lottoVendingMachine.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
// const $lottoNumbersToggleButton = document.querySelector(
//   '.lotto-numbers-toggle-button'
// );
const $purchaseLotto = document.querySelector('form.mt-5');
const $purchaseResult = document.querySelector('section.mt-9');
const $lottoAmount = $purchaseResult.querySelector('label.my-0 span');
const $lottoWinningResult = document.querySelector('form.mt-9');

function hidePurchaseResult() {
  $purchaseResult.style.visibility = 'hidden';
}

function hideLottoWinningResult() {
  $lottoWinningResult.style.visibility = 'hidden';
}

function showPurchaseResult() {
  $purchaseResult.style.visibility = 'visible';
}

function changePurchaseAmount(amount) {
  $lottoAmount.innerText = amount;
}

function openPurchasedLottoWinningResultHandler() {
  $modal.classList.add('open');
}

function closePurchasedLottoWinningResultHandler() {
  $modal.classList.remove('open');
}

function purchaseHandler(event) {
  event.preventDefault();
  showPurchaseResult();
  const money = new FormData(event.currentTarget).get('money');
  const purchasedLottoList = LottoVendingMachine.purchaseLotto(money);
  changePurchaseAmount(purchasedLottoList.length);
}

$showResultButton.addEventListener(
  'click',
  openPurchasedLottoWinningResultHandler
);
$modalClose.addEventListener('click', closePurchasedLottoWinningResultHandler);
$purchaseLotto.addEventListener('submit', purchaseHandler);

hidePurchaseResult();
hideLottoWinningResult();
