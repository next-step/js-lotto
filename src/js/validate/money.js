import { LOTTO } from '../constants/index.js';

export const validateMoney = (money) => {
  if (money % LOTTO.PRICE === 0) {
    return true;
  }
  return false;
};
