import { ErrorLottoPurchasedAmount } from "../constants/error.js";

const LottoShop = {
  LOTTO_PRICE: 1000,
  MIN_PURCHASED_AMOUNT: 1000,

  validateLottoPurchasedAmount(purchasedAmount) {
    if (isNaN(purchasedAmount)) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER
      );
    }

    if (Number(purchasedAmount) < LottoShop.MIN_PURCHASED_AMOUNT) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_TOO_SMALL
      );
    }

    if (Number(purchasedAmount) % LottoShop.LOTTO_PRICE !== 0) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_DIVISIBLE
      );
    }
  },

  getPurchasableLottoCount(purchasedAmount) {
    this.validateLottoPurchasedAmount(purchasedAmount);
    return Math.floor(Number(purchasedAmount) / LottoShop.LOTTO_PRICE);
  },
};

export default LottoShop;
