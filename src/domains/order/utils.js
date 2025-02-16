import { LOTTO_PRICE } from './constants.js';

export const calculateLottoCount = (amount) => {
  return Math.floor(amount / LOTTO_PRICE);
};
