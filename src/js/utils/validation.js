import { MINIMUM_LOTTO_MONEY, UNIT_LOTTO_MONEY } from "./message.js";

export const minimumLottoMoney = (minimum, money) => {
  if (minimum > money) {
    return MINIMUM_LOTTO_MONEY(minimum);
  }
};

export const unitLottoMoney = (unit, money) => {
  if (money % unit !== 0) {
    return UNIT_LOTTO_MONEY(unit);
  }
};
