import App from './app.js'

//jh.won
// const $inputMoneyForm = document.querySelector('#input-money-form')
new App(document.querySelector('#app'))

//basic
const $showResultButton = document.querySelector('.open-result-modal-button')
const $modalClose = document.querySelector('.modal-close')
const $modal = document.querySelector('.modal')
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
)
const onModalShow = () => {
  $modal.classList.add('open')
}

const onModalClose = () => {
  $modal.classList.remove('open')
}
// const submitInputMoney = (e) => {
//   e.preventDefault();
//   const $inputMoney = new FormData(e.target).get('')
//   alert('입금 금액은 ', $inputMoney)
// }


// $inputMoneyForm.addEventListener('submit', submitInputMoney)
$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)


