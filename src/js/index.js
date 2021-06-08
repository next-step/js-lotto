import App from "./app.js";
import { $ } from "./utils/utils.js";

const container = $("#app");
new App(container);

// const $showResultButton = document.querySelector('.open-result-modal-button')
// const $modalClose = document.querySelector('.modal-close')
// const $modal = document.querySelector('.modal')
// const $lottoNumbersToggleButton = document.querySelector(
//   '.lotto-numbers-toggle-button'
// )
//
// const onModalShow = () => {
//   $modal.classList.add('open')
// }
//
// const onModalClose = () => {
//   $modal.classList.remove('open')
// }
//
// $showResultButton.addEventListener('click', onModalShow)
// $modalClose.addEventListener('click', onModalClose)
