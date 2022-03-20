import Lotto from './purchased-lotto.js';

export function handlePurchaseClick(ev) {
  ev.preventDefault();

  const inputEl = document.querySelector('#purchase-amount');
  const amount = Number(inputEl.value);

  if (!validateMultipleOf1000(amount)) {
    alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');

    inputEl.value = '';
    inputEl.focus();

    return;
  }

  showAfterPurchaseSection();

  const lottoCount = amount / 1000;

  for (let i = 0; i < lottoCount; i++) {
    new Lotto().render();
  }
}

function showAfterPurchaseSection() {
  const purchasedLottosSection = document.querySelector('#purchased-lottos');
  const lastWinningNumbersSection = document.querySelector(
    '#last-winning-numbers'
  );

  purchasedLottosSection.style.display = 'block';
  lastWinningNumbersSection.style.display = 'block';
}

function validateMultipleOf1000(amount) {
  if (amount % 1000) {
    return false;
  }

  return true;
}
