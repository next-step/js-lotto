export default function ModalOpen() {
  const $modal = document.querySelector('.modal');

  const open = () => {
    $modal.classList.add('open');
    $modal.focus();
  };

  open();
}
