import { LOTTO_PRICE } from '../constants/lotto.js';

export const isValidLottoPurchasePrice = (lottoPurchasePrice) => {
  if (lottoPurchasePrice % LOTTO_PRICE === 0) return true;

  return false;
};
