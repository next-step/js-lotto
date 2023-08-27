import { validateLottoPrice } from "./validator.js";
import { LOTTO_PRICE } from "./constant.js";
import { validatePositiveNumber } from "../utils/validator.js";

// LottoStore: caculate lotto amount
export const LottoStore = {
  calculateLottoAmount(amount) {
    validatePositiveNumber(amount);
    validateLottoPrice(amount);

    return Math.floor(amount / LOTTO_PRICE.PRICE);
  },
};
