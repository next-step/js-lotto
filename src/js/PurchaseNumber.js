import { AMOUNT_UNIT, ERROR_MESSAGE } from './constants.js';

export class PurchaseNumber {
  number;
  constructor(amount) {
    this.validate(amount);
    this.number = amount / AMOUNT_UNIT;
  }

  validate(purchaseAmount) {
    if (purchaseAmount === '') {
      throw Error(ERROR_MESSAGE.REQUIRED);
    }

    if (!this.isValidPurchaseAmount(purchaseAmount)) {
      throw Error(ERROR_MESSAGE.INVALID);
    }
  }

  isValidPurchaseAmount(purchaseAmount) {
    return purchaseAmount > 0 && purchaseAmount % AMOUNT_UNIT === 0;
  }
}
