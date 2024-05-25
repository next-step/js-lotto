import { ErrorLottoPurchasedAmount } from "../constants/error.js";

class LottoGame {
  #lottos; // 발행된 로또들 저장
  #purchasedAmount;

  static LOTTO_PRICE = 1000;
  static MIN_PURCHASED_AMOUNT = 0;

  set purchasedAmount(purchasedAmount) {
    LottoGame.validateLottoPurchasedAmount(purchasedAmount);
    this.#purchasedAmount = purchasedAmount;
  }

  get purchasedAmount() {
    return this.#purchasedAmount;
  }

  get lottos() {
    return [...this.#lottos];
  }

  set lottos(lottos) {
    this.#lottos = lottos;
  }

  static validateLottoPurchasedAmount(purchasedAmount) {
    if (isNaN(purchasedAmount)) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER
      );
    }

    if (Number(purchasedAmount) < LottoGame.MIN_PURCHASED_AMOUNT) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_POSITIVE
      );
    }

    if (Number(purchasedAmount) % LottoGame.LOTTO_PRICE !== 0) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_DIVISIBLE
      );
    }
  }

  static getPurchasableLottoCount(purchasedAmount) {
    this.validateLottoPurchasedAmount(purchasedAmount);
    return Math.floor(Number(purchasedAmount) / LottoGame.LOTTO_PRICE);
  }
}

export default LottoGame;
