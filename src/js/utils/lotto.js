import { UNIT_OF_PRICE, LOTTO_COUNT, LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from './constant.js';

export const getTicketCount = purchasePrice => {
  return purchasePrice / UNIT_OF_PRICE;
};

export const getRandomNumbers = () => {
  const set = new Set();
  while (set.size < LOTTO_COUNT) {
    const value = Math.floor(
      Math.random() * (LOTTO_MAX_NUMBER - LOTTO_MIN_NUMBER + 1) + LOTTO_MIN_NUMBER,
    );
    set.add(value);
  }
  return Array.from(set);
};

export const getLottoNumbers = ticketAmount => {
  return new Array(ticketAmount).fill('').map(() => getRandomNumbers());
};
