import { AMOUNT_UNIT, ERROR_MESSAGE } from './constants.js';

export class PurchaseNumber {
  value;
  constructor(amount) {
    this.validate(amount);
    this.value = amount / AMOUNT_UNIT;
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
