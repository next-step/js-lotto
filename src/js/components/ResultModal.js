const modal = document.getElementById('modal');
const modalCloseButton = document.getElementById('modal-close');
const table = modal.getElementsByTagName('table')[0];
const resultRecords = Array.from(table.getElementsByTagName('tbody')[0].children);

const $profit = document.getElementById('profit');

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


export function ResultModal({ result, isShow, purchaseCost }) {
  if (!isShow) {
    modal.classList.remove('open');
    return;
  }

  modal.classList.add('open');
  resultRecords.forEach((tr) => {
    const lottoCount = tr.getAttribute('data-table');
    tr.children[2].textContent = `${result[lottoCount]}개`
  });
}
