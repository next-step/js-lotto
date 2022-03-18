import { $ } from "./shared/consts.js";
import lotto from "./lotto/lotto.js"

lotto()

const $showResultButton = $('.open-result-modal-button');
const $modalClose = $('.modal-close');
const $modal = $('.modal');
const $lottoNumbersToggleButton = $('.lotto-numbers-toggle-button');

const onModalShow = () => {
  $modal.classList.add('open')
}

const onModalClose = () => {
  $modal.classList.remove('open')
}

$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)
