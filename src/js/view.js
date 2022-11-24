import { $, $$ } from './utils/DOM.js';

const [$lottoCountAndToggle, $winningNumbers] = $$('.purchased-result');
const $lottoCount = $('[data-cy="purchased-lotto-count"]');
const $lottoList = $('[data-cy="purchased-lotto-list"]');

export const showPurchasedLotto = () => {
  $lottoCountAndToggle.classList.remove('hidden');
};

export const showWinningNumbersForm = () => {
  $winningNumbers.classList.remove('hidden');
};

export const renderLottoCount = (purchasedLottoCount) => {
  $lottoCount.textContent = `총 ${purchasedLottoCount}개를 구매하였습니다.`;
};

export const renderLottoItems = (lottoNumbersList) => {
  const lottoItemTemplate = lottoNumbersList
    .map((item) => {
      return `
      <li class="mx-1 d-flex items-center lotto-item">
        <span class="text-4xl">🎟️ </span>
        <span class="text-2xl lotto-item-numbers hidden" data-cy="lotto-item-numbers">${item.join(", ")}</span>
      </li>`;
    })
    .join('');
  $lottoList.innerHTML = lottoItemTemplate;
};

export const toggleLottoItems = ({ target }) => {
  const isCheckedToggleBtn = target.checked;

  $$('[data-cy="lotto-item-numbers"]').forEach((item) => {
    if (isCheckedToggleBtn) {
      item.classList.remove('hidden');
      return;
    }
    item.classList.add('hidden');
  });
};
