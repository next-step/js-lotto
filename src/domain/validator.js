import { parseSeparatedNumbers } from '../util/index.js';
import { ERRORS, LOTTO_PRICE, MAX_ATTEMPT, WINNING_NUMBER } from './constants/index.js';

export const validateInputPrice = (price) => {
  const PRICE = Number(price);
  validateNumber(PRICE);
  validatePositiveNumber(PRICE);
  validatePrice(PRICE);
};

export const validateWinningNumber = (winningNumbers) => {
  const splittedWinningNumbers = parseSeparatedNumbers(winningNumbers);
  splittedWinningNumbers.forEach((number) => {
    validateNumber(Number(number));
    validatePositiveNumber(Number(number));
    validateNumberRange(Number(number));
  });
  validateWinningNumberCount(splittedWinningNumbers);
  validateNumberDuplicate(splittedWinningNumbers);
};
export const validateBonusNumer = (winningNumbers, bonusNumber) => {
  validateNumber(bonusNumber);
  validateNumberRange(bonusNumber);
  validateBonusDuplicate(winningNumbers, bonusNumber);
};

export const validateNumber = (number) => {
  if (isNaN(number)) {
    throw new Error(ERRORS.NOT_NUMBER);
  }
};
export const validatePrice = (number) => {
  if (number < LOTTO_PRICE) {
    throw new Error(ERRORS.NOT_ENOUGH_MONEY);
  }
};
export const validatePositiveNumber = (number) => {
  if (number < 0 || Math.floor(number) !== number) {
    throw new Error(ERRORS.NOT_POSITIVE_NUMBER);
  }
};

export const validateWinningNumberCount = (number) => {
  if (number.length !== WINNING_NUMBER.COUNT) {
    throw new Error(ERRORS.NOT_WINNING_NUMBER_QTY);
  }
};

export const validateNumberRange = (number) => {
  if (number < WINNING_NUMBER.MIN || number > WINNING_NUMBER.MAX) {
    throw new Error(ERRORS.NOT_IN_RANGE);
  }
};

export const validateNumberDuplicate = (number) => {
  if (number.length !== new Set(number).size) {
    throw new Error(ERRORS.NOT_NUMBER_UNIQUE);
  }
};

export const validateBonusDuplicate = (winningNumbers, bonus) => {
  winningNumbers.forEach((number) => {
    if (number === Number(bonus)) {
      throw new Error(ERRORS.NOT_BONUS_NUMBER_UNIQUE);
    }
  });
};

export const isMaxAttempt = (attempt) => {
  if (attempt === MAX_ATTEMPT) {
    throw new Error(ERRORS.MAX_ATTEMPT_EXCEEDED);
  }
};
