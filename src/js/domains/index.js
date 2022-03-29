import { NUMBER } from '../constants/index.js';

export const getCount = (price) => price / NUMBER.MIN_PRICE;

const createLotto = () => {
  const lotto = new Set();
  while (lotto.size < NUMBER.LOTTO_LENGTH) {
    const num = Math.floor(Math.random() * 44) + 1;
    lotto.add(num);
  }
  return [...lotto].sort((a, b) => a - b);
};

export const createLottoList = (count) => {
  return Array.from({ length: count }, (lotto) => createLotto());
};

export const getLottoListTemplate = (lottoList) => {
  return lottoList
    .map(
      (lotto) => `
      <li class="lotto-list-item d-flex items-center">
          <span class="mx-1 text-4xl">🎟️ </span>
          <span class="lotto-detail text-xl mx-3">${lotto.join(', ')}</span>
      </li>
  `
    )
    .join('');
};
