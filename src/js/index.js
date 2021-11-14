// const $showResultButton = document.querySelector('.open-result-modal-button')
// const $modalClose = document.querySelector('.modal-close')
// const $modal = document.querySelector('.modal')
// const $lottoNumbersToggleButton = document.querySelector(
//   '.lotto-numbers-toggle-button'
// )

// const onModalShow = () => {
//   $modal.classList.add('open')
// }

// const onModalClose = () => {
//   $modal.classList.remove('open')
// }

// $showResultButton.addEventListener('click', onModalShow)
// $modalClose.addEventListener('click', onModalClose)
import MainController from './controller/MainController.js';
import { $ } from './utils/utils.js';

new MainController({
  purchaseFormSection: $('#purchaseFormSection'),
  purchasedLottoSection: $('#purchasedLottoSection'),
  winningNumberFormSection: $('#winningNumberFormSection'),
  resultModalSection: $('#resultModalSection')
});
