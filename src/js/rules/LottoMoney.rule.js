import { LOTTO_MONEY_ERR_MSG } from "../constants/error";
import { isInputNumber } from "./index";

export const lottoMoneyRule = {
  validates(money) {
    if (!this.isMoneyValid(money)) throw new Error(LOTTO_MONEY_ERR_MSG);

    return true;
  },

  isMoneyValid(money) {
    return isInputNumber(money) && money > 0;
  },
};
