import { ERROR_MESSAGES, lottoPrice } from "../utils/constants.js";

class Validator {
  constructor() {}

  validatePurchaseAmount(purchaseAmount) {
    if(!this.isValidNumber(purchaseAmount)){
        throw new Error(ERROR_MESSAGES.MUST_BE_INTEGER);
    }

    if(!this.isAboveMinimum(purchaseAmount)){
        throw new Error(ERROR_MESSAGES.MUST_BE_ABOVE_MINIMUM);
    }

    return purchaseAmount;
  }

  isValidNumber(value) {
    const number = Number(value);
    return !isNaN(Number(number)) && Number.isInteger(number);
  }

  isAboveMinimum(number) {
    return number >= lottoPrice;
  }
}

export default Validator;
