import './../css/index.css';
import { $modal, $modalClose, $purchaseForm, $showResultButton } from './dom';

class App {
 constructor() {
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
  console.log(+target.purchase.value);
 }
}

new App();

// // TODO : modal logic 분리
// const onModalShow = () => {
//  $modal.classList.add('open');
// };

// const onModalClose = () => {
//  $modal.classList.remove('open');
// };

// $showResultButton.addEventListener('click', onModalShow);
// $modalClose.addEventListener('click', onModalClose);
