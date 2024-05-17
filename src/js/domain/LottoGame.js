import { ErrorLottoGame, ErrorLottoPurchasedAmount } from "../constants/error";

const LottoGame = {
  LOTTO_PRICE: 1000,

  RESTART_GAME_TRUE: "y",
  RESTART_GAME_FALSE: "n",

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
    return Math.floor(Number(purchasedAmount) / LottoGame.LOTTO_PRICE);
  },

  validateIsRestartLottoGame(input) {
    if (![this.RESTART_GAME_FALSE, this.RESTART_GAME_TRUE].includes(input)) {
      throw new Error(ErrorLottoGame.ERROR_LOTTO_GAME_RESTART_NOT_VALID);
    }
  },
};

export default LottoGame;
