import { selector } from "./utils/consts.js";
import UI from './UI.js'

new UI().setEvent()

const showResultButton = selector('.open-result-modal-button');
const modalClose = selector('.modal-close');
const modal = selector('.modal');
const lottoNumbersToggleButton = selector('.lotto-numbers-toggle-button');

const onModalShow = () => {
  modal.classList.add('open')
}

const onModalClose = () => {
  modal.classList.remove('open')
}

showResultButton.addEventListener('click', onModalShow)
modalClose.addEventListener('click', onModalClose)
