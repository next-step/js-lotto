import { ERROR_MESSAGES, MAX_PRICE, UNIT_OF_PRICE, WINNING_NUMBER_COUNT } from './constant.js';

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
    if (inputPrice) {
      if (typeof inputPrice !== 'number') {
        throw Error(ERROR_MESSAGES.INCORRECT_TYPE_OF_PRICE);
      }
    }
  } catch (error) {
    return alert(error.message);
  }
  return true;
};

const isUnique = winningNumbers => {
  const uniqueNumberCount = new Set(winningNumbers).size;
  if (uniqueNumberCount === WINNING_NUMBER_COUNT) return true;
  return false;
};

const isInValidRange = winningNumbers => {
  const validNumberCount = winningNumbers.filter(number => number < 1 || number > 45).length;
  if (validNumberCount === 0) return true;
  return false;
};

export const checkWinningNumbers = winningNumbers => {
  try {
    if (isInValidRange(winningNumbers) === false) {
      throw Error(ERROR_MESSAGES.INVALID_WINNING_NUMBER);
    }
    if (isUnique(winningNumbers) === false) {
      throw Error(ERROR_MESSAGES.NOT_UNIQUE_WINNING_NUMBER);
    }
  } catch (error) {
    alert(error.message);
    return false;
  }
  return true;
};
