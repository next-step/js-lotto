import { NUMBER, ERROR_MESSAGES } from '../constants/index.js';

export const validatePrice = (price) => {
  const errors = { errorMsg: null };
  if (!price) {
    errors.errorMsg = ERROR_MESSAGES.EMPTY;
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

export const errorPrintAlert = (message) => {
  alert(message);
};
