import { LOTTO_UNIT_PRICE, errorMessages } from '../constants/index.js';

export const isMultipleOfLottoPrice = (number) => {
  if (number % LOTTO_UNIT_PRICE !== 0) {
    throw new Error(errorMessages.LOTTO_UNIT_PRICE_ERROR);
  }

  return true;
};
