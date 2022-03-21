import { PRICE_UNIT, ERROR_MESSAGES } from '../common/constants.js';

const checkValidPriceUnit = (price) => {
  if (price % PRICE_UNIT !== 0) {
    throw new Error(ERROR_MESSAGES.priceForm.INVALID_PRICE_UNIT);
  }
};

const validator = {
  checkValidPriceUnit,
};

export default validator;
