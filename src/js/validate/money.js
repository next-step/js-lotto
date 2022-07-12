import { LOTTO_PRICE } from '../constants/index.js';

export const validateMoney = (money) => {
  if (money % LOTTO_PRICE === 0) {
    return true;
  }
  return false;
};
