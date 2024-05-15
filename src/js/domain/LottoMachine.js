import { ErrorLottoPurchasedAmount } from "../constants/error";
import Lotto from "./Lotto";

const LottoMachine = {
  validateLottoPurchasedAmount(purchasedAmount) {
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
  },

  getPurchasableLottoCount(purchasedAmount) {
    this.validateLottoPurchasedAmount(purchasedAmount);
    return Math.floor(Number(purchasedAmount) / Lotto.LOTTO_PRICE);
  },
};

export default LottoMachine;
