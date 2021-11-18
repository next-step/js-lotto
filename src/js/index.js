import Model from './model.js';
import View from './view.js';
import Controller from "./controller.js";

// document.addEventListener('DOMContentLoaded', (event) => {
//   console.log('DOM fully loaded and parsed');
//   console.log('DOM fully loaded and parsed');
//   console.log('DOM fully loaded and parsed');
//   console.log('DOM fully loaded and parsed');
// });

const $showResultButton = document.querySelector('.open-result-modal-button')
const $modalClose = document.querySelector('.modal-close')
const $modal = document.querySelector('.modal')

const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
)

const onModalShow = () => {
  console.log('dddssd');
  $modal.classList.add('open')
}

const onModalClose = () => {
  console.log('dddssd');
  $modal.classList.remove('open')
}


$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)


document.addEventListener('DOMContentLoaded', () => {
  const app = new Controller(new Model(), new View());
  console.log('hello');
});
