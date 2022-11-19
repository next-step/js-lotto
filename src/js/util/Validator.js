import { MESSAGE } from './Constant.js';
import { getNumbers } from './Util.js';

export const isNumber = (s) => !isNaN(Number(s));
export const isUniqueNumbers = (numbers = []) => {
  const set = new Set(numbers);
  return set.size === numbers.length;
};
export const isWithInRangedNumber = (numbers = [], greaterThan = 1, lessThan = 45) => {
  const rangedNumber = numbers.filter((number) => number >= greaterThan && number <= lessThan);
  return rangedNumber.length === numbers.length;
};

export const validatePurchasingAmount = (s) => {
  if (!isNumber(s) || Number(s) < 1000) {
    throw new Error(MESSAGE.INVALID_AMOUNT_MIN);
  }
};

export const isEmptyNumberFields = (inputNumbers = []) => {
  return inputNumbers.some((s) => s === '');
};

export const validateNumbers = (inputNumbers = []) => {
  if (isEmptyNumberFields(inputNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_MODAL);
  }
  const winningNumbers = getNumbers(inputNumbers).slice(0, 6);
  if (!isUniqueNumbers(winningNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_NUMBER_DUPLICATED);
  }
  if (!isWithInRangedNumber(winningNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_NUMBER_RANGE);
  }
};
