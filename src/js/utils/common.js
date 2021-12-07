import { LOTTO_PRICE } from "../constants/index.js";

export const $ = (selector, dom = document) => {
  return dom.querySelector(selector);
};

export const $$ = (selector, dom = document) => {
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

export const get2DLottoNumberList = (arr1DLength) => {
  return new Array(arr1DLength).fill(0).map(v => getLottoNumberList());
}

export const hasDuplicateNumber = (arr) => {
  const setList = new Set();

  for (const item of arr) {
    if (setList.has(item)) return true;
    setList.add(item);
  }

  return false;
}

export const numberWithCommas = (number) => number.toLocaleString();

export const ascendingSort = (arr) => {
  return [...arr].sort(function(a, b) {
    return a - b;
  });
}

export const toFixedDecimalPoint = (number, digitsToFixed) => {
  const decimalPointIndex = (`${number}`).indexOf(".");
  if (decimalPointIndex >= 0 && [...(`${number}`)].slice(decimalPointIndex).length > digitsToFixed) {
    return number.toFixed(digitsToFixed);
  }
  return number;
}

export const getTotalReturnRate = (totalWinning, purchaseAmount) => {
  return ((totalWinning / (purchaseAmount * LOTTO_PRICE)) * 100) - 100;
}
