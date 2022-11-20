import { ErrorPurchase, PurchaseInfo } from '../common/enum.js';

export default class PurchaseService {
  #value;

  isValidAmount(value) {
    this.#value = Number(value);

    if (this.noValue()) {
      return ErrorPurchase.NO_VALUE;
    }

    if (this.outOfRange()) {
      return `${PurchaseInfo.MIN} ~ ${PurchaseInfo.MAX} ${ErrorPurchase.OUT_OF_RANGE}`;
    }

    if (this.wrongUnit()) {
      return `${PurchaseInfo.UNIT} ${ErrorPurchase.WRONG_UNIT}`;
    }

    return null;
  }

  noValue() {
    return !this.#value;
  }

  outOfRange() {
    return PurchaseInfo.MIN > this.#value || PurchaseInfo.MAX < this.#value;
  }

  wrongUnit() {
    return this.#value % PurchaseInfo.UNIT !== 0;
  }
}
