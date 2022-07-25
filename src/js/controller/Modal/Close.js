export default function ModalClose() {
  const $modal = document.querySelector('.modal');

  const close = () => {
    $modal.classList.remove('open');
  };

  close();
}
