import App from './App.js';

const $showResultButton = document.querySelector('.open-result-modal-button')
const $modalClose = document.querySelector('.modal-close')
const $modal = document.querySelector('.modal')

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

new App({
  purchasedLottos: [],
})
