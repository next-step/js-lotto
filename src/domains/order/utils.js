import { LOTTO } from '../common/constants.js';

export const calculateLottoCount = (amount) => {
  return Math.floor(amount / LOTTO.PRICE);
};
