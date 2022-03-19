import { LOTTO_PRICE } from "../constant/index.js";

export const getLottoQuantityByTotalAmount = amount => {
  return Math.floor(amount / LOTTO_PRICE);
};
