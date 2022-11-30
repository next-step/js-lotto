import {LOTTO} from "../constants/index.js";
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selectors) => document.querySelectorAll(selectors);

export const randomLotto = (min = LOTTO.MIN_NUMBER, max = LOTTO.MAX_NUMBER) => {
  return Math.ceil(Math.random() * (max + min - 1));
};

export const generateRandomList = () => {
  const lottoNumbers = new Set();

  while (lottoNumbers.size < LOTTO.TOTAL_NUMBER_COUNT) {
    lottoNumbers.add(randomLotto());
  }

  return lottoNumbers;
};

export const getWinningNumbers = (element) => {
  const numbers = new Set();

  numbers.add(Array.from(element).map((el) => el.valueAsNumber));

  return [...numbers];
};

export const getRandomNumbers = (elements) => {
  const numbers = new Set();

  [...$$(elements)].map((item) => [
    ...numbers.add(item.textContent.split(",").map((string) => +string)),
  ]);

  return [...numbers];
};
