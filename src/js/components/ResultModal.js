const modal = document.getElementById('modal');


export function ResultModal({ result, isShow }) {
  if (!isShow) {
    modal.classList.remove('open');
    return;
  }

  modal.classList.add('open');
}
