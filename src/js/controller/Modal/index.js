import ModalClose from './Close.js';

const ESC_KEY_CODE = 27;

export default function Modal() {
  const $modal = document.querySelector('.modal');
  const $modalClose = $modal.querySelector('.modal-close');

  $modalClose.addEventListener('click', ModalClose);

  $modal.addEventListener('keydown', event => {
    if (event.keyCode === ESC_KEY_CODE) {
      ModalClose();
    }
  });
  $modal.addEventListener('click', event => {
    if (event.target !== $modal) {
      return;
    }
    ModalClose();
  });
}
