import {LOTTO} from "../constants/index.js";
export const $ = (selector) => document.querySelector(selector);

export const randomLotto = (max = LOTTO.MAX_VALUE) => {
  if (Math.random === 0) return;

  return Math.ceil(Math.random() * max);
};
