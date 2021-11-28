import { LOTTO_PRICE } from "../constants/index.js";

export const selector = (selector, dom = document) => {
  return dom.querySelector(selector);
};

export const selectorAll = (selector, dom = document) => {
  return dom.querySelectorAll(selector);
};

export const computedAmount = (purchaseAmount) => {
  return Math.floor(Number(purchaseAmount) / LOTTO_PRICE);
};

export const getRandomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getLottoNumberList = (listSize = 6) => {
  const newLottoSet = new Set();
  const lottoNumberArray = Array.from(new Array(45), (_, i) => i + 1);

  while (newLottoSet.size < listSize) {
    newLottoSet.add(lottoNumberArray.splice(getRandomNumbers(1, lottoNumberArray.length) - 1, 1).pop())
  }
  return [...newLottoSet];
}

export const hasDuplicateNumber = (arr) => {
  const setList = new Set();

  for (const item of arr) {
    if (setList.has(item)) return true;
    setList.add(item);
  }

  return false;
}

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}