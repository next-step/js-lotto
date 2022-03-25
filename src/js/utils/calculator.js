import { LOTTO_PRICE } from "../constant/index.js";

export const getQuantityByTotalAmount = amount => {
  return Math.floor(amount / LOTTO_PRICE);
};
