import { onConfirmPrice } from "./srcs/pushConfirm.js";
import { onClickToggle } from "./srcs/pushToggle.js";
import { $lottoNumbersToggleButton, $sectionAndForm } from "./utils/constant.js";

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $confirm = document.querySelector('.btn');
const $form = document.querySelector('.form');

const onModalShow = () => {
  $modal.classList.add('open');
}

const onModalClose = () => {
  $modal.classList.remove('open');
}

$sectionAndForm.forEach(sectionAndForm => {
  sectionAndForm.style.display = "none";
})

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();
})
$confirm.addEventListener('click', onConfirmPrice);
$lottoNumbersToggleButton.addEventListener('click', onClickToggle);
$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
