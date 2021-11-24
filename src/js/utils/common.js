import { LOTTO_PRICE } from "../constants/index.js";

export const selector = (selector, dom = document) => {
  return dom.querySelector(selector);
};

export const selectorAll = (selector, dom = document) => {
  return dom.queryselectorAll(selector);
};

export const computedAmount = (purchaseAmount) => {
  return Math.floor(Number(purchaseAmount) / LOTTO_PRICE);
};

export const getRandomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getLottoNumberList = () => {
  const newLottoNumbers = new Set(new Array(6).fill(0).map(() => getRandomNumbers(1, 45)));

  while (newLottoNumbers.size < 6) {
    newLottoNumbers.add(getRandomNumbers(1, 45));
  }
  return [...newLottoNumbers];
}
