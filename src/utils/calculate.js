import { SINGLE_LOTTO_PRICE } from "../data/constant.js";

export const calcLottoCount = (price) => {
  return price / SINGLE_LOTTO_PRICE;
};

export const createRandomLottoNumber = () => {
  return Math.floor(Math.random() * 45) + 1;
};

export const priceWithCommas = (price) => {
  return price.toLocaleString();
};
