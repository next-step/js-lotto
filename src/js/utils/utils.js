import { LOTTO } from './constants.js';

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const isVaildMoney = (price) => {
  return price % LOTTO.UNIT;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export { $, $$, isVaildMoney, getRandomNumber };
