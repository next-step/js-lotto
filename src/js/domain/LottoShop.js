import { ErrorLottoPurchasedAmount } from "../constants/error.js";

class LottoShop {
  #purchasedAmount;

  static LOTTO_PRICE = 1000;
  static MIN_PURCHASED_AMOUNT = 0;

  constructor(purchasedAmount) {
    LottoShop.validateLottoPurchasedAmount(purchasedAmount);
    this.#purchasedAmount = Number(purchasedAmount);
  }

  get purchasedAmount() {
    return this.#purchasedAmount;
  }

  static validateLottoPurchasedAmount(purchasedAmount) {
    if (isNaN(purchasedAmount)) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER
      );
    }

    if (Number(purchasedAmount) < LottoShop.MIN_PURCHASED_AMOUNT) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_POSITIVE
      );
    }

    if (Number(purchasedAmount) % LottoShop.LOTTO_PRICE !== 0) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_DIVISIBLE
      );
    }
  }

  static getPurchasableLottoCount(purchasedAmount) {
    this.validateLottoPurchasedAmount(purchasedAmount);
    return Math.floor(Number(purchasedAmount) / LottoShop.LOTTO_PRICE);
  }
}

export default LottoShop;
