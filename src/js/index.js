import {
  $confirm,
  $form,
  $lottoNumbersToggleButton,
  $modal,
  $modalClose,
  $sectionAndForm,
  $showResultButton,
} from './constants/dom.js';
import { pushConfirm } from './function/pushConfirm.js';
import { onClickToggle } from './function/pushToggle.js';

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$sectionAndForm.forEach((sectionAndForm) => {
  sectionAndForm.style.display = 'none';
});

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopPropagation();
});

$confirm.addEventListener('click', pushConfirm);
$lottoNumbersToggleButton.addEventListener('click', onClickToggle);
$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
