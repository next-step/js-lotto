// import { LottoVendingMachine } from './lottoVendingMachine.js';
// import { Wallet } from './data/wallet.js';
//
// const $showResultButton = document.querySelector('.open-result-modal-button');

// const $purchaseLotto = document.querySelector('form.mt-5');
// const $purchaseResult = document.querySelector('section.mt-9');
// const $purchasedLottoAmount = $purchaseResult.querySelector('label.my-0 span');
// const $purchasedLottoList = $purchaseResult.querySelector(
//   'div.d-flex.flex-wrap'
// );
// const $lottoWinningResult = document.querySelector('form.mt-9');
// const myWallet = new Wallet();
//
// function isShowPurchasedLottoNumber() {
//   return $lottoNumbersToggleButton.checked;
// }
//
// function hidePurchaseResult() {
//   $purchaseResult.style.visibility = 'hidden';
// }
//
// function showPurchaseResult() {
//   $purchaseResult.style.visibility = 'visible';
// }
//
// function hideLottoWinningResult() {
//   $lottoWinningResult.style.visibility = 'hidden';
// }
//
// function initPurchasedLottoList() {
//   $purchasedLottoList.replaceChildren();
// }
//
// function getLottoElement() {
//   const $lotto = document.createElement('span');
//   $lotto.classList.add('mx-1', 'text-4xl');
//   $lotto.innerHTML = '🎟️ ';
//   return $lotto;
// }
//
// function addLottoToPurchasedLottoList(lotto) {
//   $purchasedLottoList.appendChild(getLottoElement(lotto));
// }
//
// function changePurchasedAmount(amount) {
//   $purchasedLottoAmount.innerText = amount;
// }
//
// function changePurchasedLottos(lottos) {
//   lottos.forEach(addLottoToPurchasedLottoList);
// }
//
// function changePurchaseResult(lottos = []) {
//   initPurchasedLottoList();
//   changePurchasedAmount(lottos.length);
//   changePurchasedLottos(lottos);
// }
//
// function showPurchasedLottoNumbers() {
//   if (isShowPurchasedLottoNumber()) {
//     $lotto.innerHTML += lotto.value;
//   }
//   $purchasedLottoList.appendChild();
// }
//
// function hidePurchasedLottoNumbers() {}
//
// function handleOpenPurchasedLottoWinningResult() {
//   $modal.classList.add('open');
// }
//
// function handleClosePurchasedLottoWinningResult() {
//   $modal.classList.remove('open');
// }
//
// function handlePurchase(event) {
//   const money = new FormData(event.currentTarget).get('money');
//   myWallet.addLottos(LottoVendingMachine.purchaseLotto(money));
//   changePurchaseResult(myWallet.lottos);
//   event.preventDefault();
//   showPurchaseResult();
// }
//
// function handleTogglePurchasedLottoNumbers() {
//   if (isShowPurchasedLottoNumber()) {
//     showPurchasedLottoNumbers();
//     return;
//   }
//   hidePurchasedLottoNumbers();
// }
//
// $showResultButton.addEventListener(
//   'click',
//   handleOpenPurchasedLottoWinningResult
// );
// $modalClose.addEventListener('click', handleClosePurchasedLottoWinningResult);
// $purchaseLotto.addEventListener('submit', handlePurchase);
// $lottoNumbersToggleButton.addEventListener(
//   'click',
//   handleTogglePurchasedLottoNumbers
// );
//
// hidePurchaseResult();
// hideLottoWinningResult();
// initPurchasedLottoList();

import { LottoVendingView } from './view/LottoVendingView.js';

const lottoVendingView = new LottoVendingView();
lottoVendingView.initial();
