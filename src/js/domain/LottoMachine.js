import { ErrorLottoPurchasedAmount } from "../constants/error";
import Lotto from "./Lotto";

class LottoMachine {
  #purchasedAmount;

  constructor(purchasedAmount) {
    LottoMachine.validateLottoPurchasedAmount(purchasedAmount);
    this.#purchasedAmount = Number(purchasedAmount);
  }

  static validateLottoPurchasedAmount(purchasedAmount) {
    if (isNaN(purchasedAmount)) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER
      );
    }

    if (Number(purchasedAmount) < 0) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_POSITIVE
      );
    }
  }

  getPurchasableLottoCount() {
    return Math.floor(Number(this.#purchasedAmount) / Lotto.LOTTO_PRICE);
  }
}

export default LottoMachine;
