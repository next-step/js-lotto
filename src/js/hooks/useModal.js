export default function useModal() {
  const $modal = document.querySelector('.modal');
  const $modalClose = $modal.querySelector('.modal-close');

  const open = () => {
    $modal.classList.add('open');
  };

  const close = () => {
    $modal.classList.remove('open');
  };

  $modalClose.addEventListener('click', close);
  $modal.addEventListener('click', event => {
    if (event.target !== $modal) {
      return;
    }
    close();
  });

  return {
    $modal,
    open,
    close,
  };
}
