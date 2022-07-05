import {$, addEvent} from './util.js';
import { OPEN_RESULT_MODAL_BUTTON, CLOSE_RESULT_MODAL_BUTTON, LOTTO_NUMBERS_TOGGLE_BUTTON } from './constants/selectors.js';
import { onClickOpenResultModalBtn, onClickCloseResultModalBtn, onClickLottoNumbersToggleBtn } from './event.js';

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

$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)

const initApp = function () {
  addEvent($(OPEN_RESULT_MODAL_BUTTON), 'click', onClickOpenResultModalBtn)
  addEvent($(CLOSE_RESULT_MODAL_BUTTON), 'click', onClickCloseResultModalBtn)
  addEvent($(LOTTO_NUMBERS_TOGGLE_BUTTON), 'click', onClickLottoNumbersToggleBtn)
}

initApp();