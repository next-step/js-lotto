import { MESSAGE } from './Constant.js';

/** @type {number} */
export const isNumber = (s) => !isNaN(Number(s));

/**
 * @param {number[]} numbers
 * @returns {boolean}
 * */
export const isUniqueNumbers = (numbers) => {
  const set = new Set(numbers);
  return set.size === numbers.length;
};

/**
 * @param {number[]} numbers
 * @param {number} greaterThan
 * @param {number} lessThan
 * @returns {boolean}
 * */
export const isWithInRangedNumber = (numbers, greaterThan = 1, lessThan = 45) => {
  const rangedNumber = numbers.filter((number) => number >= greaterThan && number <= lessThan);
  return rangedNumber.length === numbers.length;
};

/**
 *
 * @param {string} s
 */
export const validatePurchasingAmount = (s) => {
  if (!isNumber(s) || Number(s) < 1000) {
    throw new Error(MESSAGE.INVALID_AMOUNT_MIN);
  }
};

/**
 *
 * @param {string} s
 * @returns {boolean}
 */
export const isLottoNumberInput = (s) => !s.length === 1 && !isNumber(s);

/**
 * @param {string[]|number[]} inputNumbers
 * @returns {boolean}
 * */
export const isEmptyNumberFields = (inputNumbers) => {
  return inputNumbers.some((s) => s === '');
};

/**
 * @param {string[]|number[]} inputNumbers
 * */
export const validateNumbers = (inputNumbers) => {
  if (isEmptyNumberFields(inputNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_MODAL);
  }
  if (!isUniqueNumbers(inputNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_NUMBER_DUPLICATED);
  }
  if (!isWithInRangedNumber(inputNumbers)) {
    throw new Error(MESSAGE.INVALID_WINNING_NUMBER_RANGE);
  }
};
