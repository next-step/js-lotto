import {
  LOTTO_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "./constants.js";

export const createLottoNumbers = () => {
  return createUniqueNumbers().sort((a, b) => a - b);
};

const createUniqueNumbers = () => {
  const numbers = new Set();
  while (numbers.size < LOTTO_NUMBER_COUNT) {
    numbers.add(getRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER));
  }
  return [...numbers];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};
