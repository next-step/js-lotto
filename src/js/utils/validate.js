import { ERROR_MESSAGES, MAX_PRICE, UNIT_OF_PRICE, WINNING_NUMBER_COUNT } from './constant.js';

const isPriceNegative = inputPrice => inputPrice && typeof inputPrice !== 'number';

export const isValidatePrice = inputPrice => {
  try {
    if (inputPrice < 0) {
      throw Error(ERROR_MESSAGES.CANNOT_NEGATIVE_PRICE);
    }
    if (inputPrice > MAX_PRICE) {
      throw Error(ERROR_MESSAGES.EXCEED_PRICE);
    }
    if (inputPrice % UNIT_OF_PRICE > 0 || inputPrice === 0) {
      throw Error(ERROR_MESSAGES.INCORRECT_UNIT_OF_PRICE);
    }
    if (isPriceNegative(inputPrice)) {
      throw Error(ERROR_MESSAGES.INCORRECT_TYPE_OF_PRICE);
    }
  } catch (error) {
    return alert(error.message);
  }
  return true;
};

const isUnique = winningNumbers => {
  const uniqueNumberCount = new Set(winningNumbers).size;
  return uniqueNumberCount === WINNING_NUMBER_COUNT;
};

const isInValidRange = winningNumbers => {
  const validNumberCount = winningNumbers.filter(number => number < 1 || number > 45).length;
  if (validNumberCount === 0) return true;
  return false;
};

export const checkWinningNumbers = winningNumbers => {
  try {
    if (!isInValidRange(winningNumbers)) {
      throw Error(ERROR_MESSAGES.INVALID_WINNING_NUMBER);
    }
    if (!isUnique(winningNumbers)) {
      throw Error(ERROR_MESSAGES.NOT_UNIQUE_WINNING_NUMBER);
    }
  } catch (error) {
    return alert(error.message);
  }
  return true;
};
