import { ErrorLottoPurchasedAmount } from "../constants/error.js";

class LottoPurchaseManager {
  #lottos; // 구매한 로또들 저장
  #purchasedAmount;

  static LOTTO_PRICE = 1000;
  static MIN_PURCHASED_AMOUNT = 0;

  constructor(purchasedAmount, lottos) {
    LottoPurchaseManager.validateLottoPurchasedAmount(purchasedAmount);
    this.#purchasedAmount = Number(purchasedAmount);

    this.#lottos = lottos;
  }

  get purchasedAmount() {
    return this.#purchasedAmount;
  }

  get lottos() {
    return [...this.#lottos];
  }

  static validateLottoPurchasedAmount(purchasedAmount) {
    if (isNaN(purchasedAmount)) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER
      );
    }

    if (Number(purchasedAmount) < LottoPurchaseManager.MIN_PURCHASED_AMOUNT) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_POSITIVE
      );
    }

    if (Number(purchasedAmount) % LottoPurchaseManager.LOTTO_PRICE !== 0) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_DIVISIBLE
      );
    }
  }

  static getPurchasableLottoCount(purchasedAmount) {
    this.validateLottoPurchasedAmount(purchasedAmount);
    return Math.floor(
      Number(purchasedAmount) / LottoPurchaseManager.LOTTO_PRICE
    );
  }
}

export default LottoPurchaseManager;
