import { lottoStore } from "../store/LottoStore.js";
import { resultStore } from "../store/ResultStore.js";

const $modalContainer = document.getElementById('modal');
const $modalCloseButton = document.getElementById('modal-close');
const $table = $modalContainer.getElementsByTagName('table')[0];
const $resultRecordCollection = Array.from($table.getElementsByTagName('tbody')[0].children);
const $profit = document.getElementById('profit');
const $resetButton = document.getElementById('reset-button');

$modalCloseButton.addEventListener('click', (e) => {
  e.stopPropagation();
  $modalContainer.classList.remove('open');
});

$resetButton.addEventListener('click', (e) => {
  e.stopPropagation();
  lottoStore.dispatch();
  resultStore.dispatch();
  $modalContainer.classList.remove('open');
});

export function ResultModal({ result, isShow, purchaseCost }) {
  if (!isShow) {
    $modalContainer.classList.remove('open');
    return;
  }

  $modalContainer.classList.add('open');

  $resultRecordCollection.forEach((tr) => {
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
