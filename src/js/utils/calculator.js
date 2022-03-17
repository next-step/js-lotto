import { LOTTO_PRICE } from "../constant";

export const getLottoQuantityByInputMoney = input => {
  return Math.floor(input / LOTTO_PRICE);
};
