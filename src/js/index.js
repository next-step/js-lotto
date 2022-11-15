import './../css/index.css';

import PurchaseModel from './Model/PurchaseModel';
import LotteryResultView from './View/LotteryResultView';
import { $modal, $modalClose, $purchaseForm, $showResultButton } from './dom';

class App {
 constructor(Model, views) {
  this.purchase = new Model();
  views.forEach((View) => new View(this.purchase));
  this.setEvent();
 }

 setEvent() {
  $purchaseForm.addEventListener(
   'submit',
   this.handlePurchaseFormSubmit.bind(this)
  );
 }

 handlePurchaseFormSubmit(event) {
  event.preventDefault();
  const target = event.currentTarget;
  if (!target) return;
  this.purchase.buy = +target.purchase.value;
 }
}

new App(PurchaseModel, [LotteryResultView]);

// // TODO : modal logic 분리
// const onModalShow = () => {
//  $modal.classList.add('open');
// };

// const onModalClose = () => {
//  $modal.classList.remove('open');
// };

// $showResultButton.addEventListener('click', onModalShow);
// $modalClose.addEventListener('click', onModalClose);
