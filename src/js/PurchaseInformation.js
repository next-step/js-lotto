import { PRICE_PER_LOTTO } from "./constants.js";

class PurchaseInformation {
  constructor(payment, purchasedLottoCount, purchasedLottos) {
    this.payment = payment;
    this.purchasedLottoCount = purchasedLottoCount;
    this.purchasedLottos = purchasedLottos;
  }

  get payment() {
    return this._payment;
  }

  set payment(newPayment) {
    this._payment = newPayment;
  }

  get purchasedLottoCount() {
    return this._purchasedLottoCount;
  }

  set purchasedLottoCount(newPurchasedLottoCount) {
    this._purchasedLottoCount = newPurchasedLottoCount;
  }

  get purchasedLottos() {
    return this._purchasedLottos;
  }

  set purchasedLottos(newPurchasedLottos) {
    this._purchasedLottos = newPurchasedLottos;
  }
}

const isPaymentUnitsOf1000Won = payment => {
  if (payment % PRICE_PER_LOTTO === 0) {
    return true;
  }
  return false;
};

export { PurchaseInformation, isPaymentUnitsOf1000Won };
