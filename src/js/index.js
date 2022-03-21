import { LottoVendingMachine } from './lottoVendingMachine.js';
import { Wallet } from './wallet.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
const $purchaseLotto = document.querySelector('form.mt-5');
const $purchaseResult = document.querySelector('section.mt-9');
const $purchasedLottoAmount = $purchaseResult.querySelector('label.my-0 span');
const $purchasedLottoList = $purchaseResult.querySelector(
  'div.d-flex.flex-wrap'
);
const $lottoWinningResult = document.querySelector('form.mt-9');
const myWallet = new Wallet();

function isShowPurchasedLottoNumber() {
  return $lottoNumbersToggleButton.checked;
}

function hidePurchaseResult() {
  $purchaseResult.style.visibility = 'hidden';
}

function showPurchaseResult() {
  $purchaseResult.style.visibility = 'visible';
}

function hideLottoWinningResult() {
  $lottoWinningResult.style.visibility = 'hidden';
}

function initPurchasedLottoList() {
  $purchasedLottoList.replaceChildren();
}

function getLottoElement(lotto) {
  const $lotto = document.createElement('span');
  $lotto.classList.add('mx-1', 'text-4xl');
  $lotto.innerHTML = '🎟️ ';
  if (isShowPurchasedLottoNumber()) {
    $lotto.innerHTML += lotto.value;
  }

  return $lotto;
}

function addLottoToPurchasedLottoList(lotto) {
  $purchasedLottoList.appendChild(getLottoElement(lotto));
}

function changePurchasedAmount(amount) {
  $purchasedLottoAmount.innerText = amount;
}

function changePurchasedLottos(lottos) {
  lottos.forEach(addLottoToPurchasedLottoList);
}

function changePurchaseResult(lottos = []) {
  initPurchasedLottoList();
  changePurchasedAmount(lottos.length);
  changePurchasedLottos(lottos);
}

function openPurchasedLottoWinningResultHandler() {
  $modal.classList.add('open');
}

function closePurchasedLottoWinningResultHandler() {
  $modal.classList.remove('open');
}

function handlePurchase(event) {
  const money = new FormData(event.currentTarget).get('money');
  myWallet.addLottos(LottoVendingMachine.purchaseLotto(money));
  changePurchaseResult(myWallet.lottos);
  event.preventDefault();
  showPurchaseResult();
}

function togglePurchasedLottoNumbersHandler() {
  changePurchaseResult(myWallet.lottos);
}

$showResultButton.addEventListener(
  'click',
  openPurchasedLottoWinningResultHandler
);
$modalClose.addEventListener('click', closePurchasedLottoWinningResultHandler);
$purchaseLotto.addEventListener('submit', handlePurchase);
$lottoNumbersToggleButton.addEventListener(
  'click',
  togglePurchasedLottoNumbersHandler
);

hidePurchaseResult();
hideLottoWinningResult();
initPurchasedLottoList();
