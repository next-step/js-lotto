import {LOTTO} from "../constants/index.js";
export const $ = (selector) => document.querySelector(selector);

export const $$ = (selectors) => document.querySelectorAll(selectors);

export const randomLotto = (min = LOTTO.MIN_NUMBER, max = LOTTO.MAX_NUMBER) => {
  return Math.ceil(Math.random() * (max + min - 1));
};

export const generateRandomList = () =>
  [...Array(LOTTO.TOTAL_NUMBER_COUNT)].map(() => randomLotto());

export const getWinningNumbers = (element) =>
  Array.from(element).map((el) => el.valueAsNumber);
