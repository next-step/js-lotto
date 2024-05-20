import { LOTTO_MONEY_ERR_MSG } from "../constants/error";

export const lottoMoneyRule = {
  validates(money) {
    if (!this.isMoneyValid(money)) throw new Error(LOTTO_MONEY_ERR_MSG);

    return true;
  },

  isMoneyValid(money) {
    return typeof money === "number" && !isNaN(money) && money > 0;
  },
};
