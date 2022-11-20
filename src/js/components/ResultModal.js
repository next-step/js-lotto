import { lottoStore } from "../store/LottoStore.js";
import { resultStore } from "../store/ResultStore.js";

const modal = document.getElementById('modal');
const modalCloseButton = document.getElementById('modal-close');
const table = modal.getElementsByTagName('table')[0];
const resultRecords = Array.from(table.getElementsByTagName('tbody')[0].children);

const $profit = document.getElementById('profit');

const $resetButton = document.getElementById('reset-button');

modalCloseButton.addEventListener('click', (e) => {
  e.stopPropagation();
  modal.classList.remove('open');
});

$resetButton.addEventListener('click', (e) => {
  e.stopPropagation();
  lottoStore.dispatch();
  resultStore.dispatch();
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

  const totalPrice = calcPrice(result);
  const profitRatio = Math.floor(((totalPrice - purchaseCost) / purchaseCost) * 100);
  $profit.textContent = profitRatio;
}

function calcPrice(result) {
  let price = 0;
  const resultAndMoneyMap = {
    3: 5000,
    4: 50000,
    5: 1500000,
    bonus: 30000000,
    6: 2000000000,
  };

  Object.entries(result).forEach(([key, val]) => {
    price += (resultAndMoneyMap[key] * val);
  });

  return price;
}
