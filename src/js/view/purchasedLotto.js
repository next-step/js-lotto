import { $, $$ } from '../utils/DOM.js';

const [$lottoCountAndToggle, $winningNumbers] = $$('.purchased-result');
const $lottoCount = $('.purchased-lotto-count');
const $lottoList = $('.purchased-lotto-list');

export const renderPurchasedLotto = () => {
  $lottoCountAndToggle.classList.remove('hidden');
};

export const renderWinningNumbersForm = () => {
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
        <span class="text-2xl lotto-item-numbers hidden">${item.join(', ')}</span>
      </li>`;
    })
    .join('');
  $lottoList.innerHTML = lottoItemTemplate;
};

export const renderPurchasedLottoNumbers = ({ target }) => {
  $$('.lotto-item-numbers').forEach((item) => {
    item.classList.toggle('hidden', !target.checked);
  });
};
