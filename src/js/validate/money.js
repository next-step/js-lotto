import { LOTTO } from '../constants/index.js';

export const validateMoney = (money) => {
  return money % LOTTO.PRICE === 0;
};
