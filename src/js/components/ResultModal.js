const modal = document.getElementById('modal');
const modalCloseButton = document.getElementById('modal-close');

const resultAndMoneyMap = {
  3: 5000,
  4: 50000,
  5: 1500000,
  bonus: 30000000,
  6: 2000000000,
};

modalCloseButton.addEventListener('click', (e) => {
  e.stopPropagation();
  modal.classList.remove('open');
});


export function ResultModal({ result, isShow }) {
  if (!isShow) {
    modal.classList.remove('open');
    return;
  }

  modal.classList.add('open');
}
