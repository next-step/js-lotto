import { LOTTO_CONSTRAINT, ERROR_MESSAGE } from './constants/index.js';

const isEmpty = (number) => Number.isNaN(number);

const isWithinLottoNumberRange = (number) => {
  return (
    number >= LOTTO_CONSTRAINT.MIN_IN_LOTTO_NUMBER && number <= LOTTO_CONSTRAINT.MAX_IN_LOTTO_NUMBER
  );
};

export const validateWithinLottoNumberRange = (winningNumbers) => {
  winningNumbers.forEach((number) => {
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
