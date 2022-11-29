import { LOTTO_CONSTRAINT, ERROR_MESSAGE } from './constants/index.js';
import { isEmpty, isWithinLottoNumberRange } from './utils/validation.js';

export const validateWithinLottoNumberRange = (winningNumbersAndBonus) => {
  winningNumbersAndBonus.forEach((number) => {
    if (isEmpty(number) || !isWithinLottoNumberRange(number)) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER_WITHIN_RANGE);
    }
  });
};

export const hasDuplicatedNumber = (winningNumbersAndBonus) => {
  if (new Set(winningNumbersAndBonus).size < LOTTO_CONSTRAINT.LOTTO_NUMBERS_COUNT) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_NUMBER);
  }
};
