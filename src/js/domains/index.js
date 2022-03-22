import { NUMBER } from '../constants/index.js';

export const isValidPrice = (price) => {
  if (!price) {
    alert(ERROR_MESSAGES.EMPTY);
    return false;
  }
  if (price < NUMBER.MIN_PRICE) {
    alert(ERROR_MESSAGES.MIN_PRICE);
    return false;
  }
  if (price > NUMBER.MAX_PRICE) {
    alert(ERROR_MESSAGES.MAX_PRICE);
    return false;
  }
  if (price % NUMBER.MIN_PRICE !== 0) {
    alert(ERROR_MESSAGES.BUY_UNIT);
    return false;
  }

  return true;
};

export const createLottoList = (count) => {
  const lottoList = [];
  for (let i = 0; i < count; i++) {
    const lotto = new Set();
    while (lotto.size < NUMBER.LOTTO_LENGTH) {
      const num = Math.floor(Math.random() * 44) + 1;
      lotto.add(num);
    }
    lottoList.push([...lotto].sort((a, b) => a - b));
  }
  return lottoList;
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
