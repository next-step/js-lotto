import { LOTTO_UNIT_PRICE, errorMessages } from '../constants/index.js';

export const isMultipleOfLottoPrice = (number) => {
  if (number % LOTTO_UNIT_PRICE !== 0) {
    throw new Error(errorMessages.LOTTO_UNIT_PRICE_ERROR);
  }

  return true;
};

export const isDuplicateNumbers = (numbers) => {
  if (new Set(numbers).size !== numbers.length) {
    throw new Error(errorMessages.DUPLICATE_NUMBERS_ERROR);
  }

  return false;
};
