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

export const getWinningNumbers = (number) => {
  const winningNumberSet = new Set();

  winningNumberSet.add(Array.from(number).map((el) => el.valueAsNumber));

  const winningNumberArr = [...winningNumberSet];

  return winningNumberArr;
};

export const getRandomNumbers = (lotto) => {
  const lottoNumbersSet = new Set();
  const lottoContainer = [...$$(lotto)];

  lottoContainer.map((number) => [
    ...lottoNumbersSet.add(
      number.textContent.split(",").map((string) => +string)
    ),
  ]);

  const lottoNumberArr = [...lottoNumbersSet];

  return lottoNumberArr;
};
