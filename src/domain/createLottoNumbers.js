import {
  LOTTO_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "./constants";

export const createLottoNumbers = () => {
  const lottoNumbers = createUniqueNumbers().sort((a, b) => a - b);
  return lottoNumbers;
};

const createUniqueNumbers = () => {
  const numbers = new Set();
  while (numbers.size < LOTTO_NUMBER_COUNT) {
    numbers.add(getRandomLottoNumber());
  }
  return [...numbers];
};

const getRandomLottoNumber = () => {
  return Math.floor(Math.random() * MAX_LOTTO_NUMBER) + MIN_LOTTO_NUMBER;
};
