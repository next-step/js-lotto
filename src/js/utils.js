import {LOTTO_LENGTH} from "./constants.js";

export const $ = (selector, el = document) => el.querySelector(selector);

export const $$ = (selector, el = document) => el.querySelectorAll(selector);

export const countSameNumbers = (arr1, arr2) => {
  let result = 0;
  for (let i = 0; i < LOTTO_LENGTH; i++) {
    if (arr1.includes(arr2[i])) {
      result++;
    }
  }
  return result;
};