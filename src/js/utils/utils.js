import { LOTTO } from './constants.js';

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const isVaildMoney = (price) => {
  return price % LOTTO.UNIT;
};

export { $, $$, isVaildMoney };
