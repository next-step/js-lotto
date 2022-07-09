import { LOTTO_UNIT, MESSAGES } from './constants.js';

export const checkLottoUnit = (price) => {
  if (parseInt(price, 10) % LOTTO_UNIT !== 0) throw new Error(MESSAGES.LOTTO_UNIT_ERROR);
};
