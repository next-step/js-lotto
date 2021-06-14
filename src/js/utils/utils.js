import { LOTTO } from './constants.js';

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const isVaildMoney = (price) => {
  return price % LOTTO.UNIT;
};

const isValidLotto = (lottos) => {
  const lottoCount = [...lottos].reduce((lottoNumberSet, lotto) => {
    const [key, lottoNumber] = lotto;
    lottoNumberSet.add(lottoNumber);
    return lottoNumberSet;
  }, new Set()).size;
  return lottoCount === LOTTO.COUNTS + 1;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const setToString = (value) => {
  return [...value].join(', ');
};

export { $, $$, isVaildMoney, isValidLotto, getRandomNumber, setToString };
