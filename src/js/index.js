import { Home } from "./components/Home.js";
import './LottoPurchaseController.js';
import './MyLottoInputController.js';

const $showResultButton = document.querySelector('.open-result-modal-button')
const $modalClose = document.querySelector('.modal-close')
const $modal = document.querySelector('.modal')
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
)
console.log('div')
const root = document.getElementById('app');

const mt9s = Array.from(document.getElementsByClassName('mt-9'));
mt9s.forEach((el) => {
  // el.classList.add('hide');
})

// const onModalShow = () => {
//   $modal.classList.add('open')
// }

// const onModalClose = () => {
//   $modal.classList.remove('open')
// }

// $showResultButton.addEventListener('click', onModalShow)
// $modalClose.addEventListener('click', onModalClose)
