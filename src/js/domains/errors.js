import { NUMBER, ERROR_MESSAGES } from '../constants/index.js';

export const validatePrice = (price) => {
  const errors = { errorMsg: null };
  if (!price) {
    errors.errorMsg = ERROR_MESSAGES.EMPTY_MONEY;
    return errors;
  }
  if (price < NUMBER.MIN_PRICE) {
    errors.errorMsg = ERROR_MESSAGES.MIN_PRICE;
    return errors;
  }
  if (price > NUMBER.MAX_PRICE) {
    errors.errorMsg = ERROR_MESSAGES.MAX_PRICE;
    return errors;
  }
  if (price % NUMBER.MIN_PRICE !== 0) {
    errors.errorMsg = ERROR_MESSAGES.BUY_UNIT;
    return errors;
  }

  return errors;
};

export const validateWinningNumber = (winningNumber, bonusNumber) => {
  const errors = { errorMsg: null };

  console.log('new Set(winningNumber).size', new Set(winningNumber).size);
  console.log('winningNumber.length', winningNumber.length);
  if (winningNumber.length < NUMBER.LOTTO_LENGTH) {
    errors.errorMsg = ERROR_MESSAGES.EMPTY_NUMBER;
    return errors;
  }

  if (!bonusNumber) {
    errors.errorMsg = ERROR_MESSAGES.EMPTY_BONUS_NUMBER;
    return errors;
  }

  if (new Set([...winningNumber, bonusNumber]).size < NUMBER.LOTTO_LENGTH + 1) {
    errors.errorMsg = ERROR_MESSAGES.DUPLICATED_NUMBER;
    return errors;
  }

  return errors;
};

export const errorPrintAlert = (message) => {
  alert(message);
};
