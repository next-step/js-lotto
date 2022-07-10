// NOTE : 다음 단계 미션 관련

export default function ResultModal() {
  const $showResultButton = document.querySelector('.open-result-modal-button');
  const $modalClose = document.querySelector('.modal-close');
  const $modal = document.querySelector('.modal');

  const onModalShow = () => {
    $modal.classList.add('open');
  };

  const onModalClose = () => {
    $modal.classList.remove('open');
  };

  $showResultButton.addEventListener('click', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
}
