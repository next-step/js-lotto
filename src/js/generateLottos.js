import { LOTTO_LENGTH, LOTTO_NUMBER_RANGE } from './constants.js';

const generateLottoNumbers = () => {
  const numberSet = new Set();
  while (numberSet.size < LOTTO_LENGTH) {
    const generatedNumber = getRandomNumber(LOTTO_NUMBER_RANGE);
    numberSet.add(generatedNumber);
  }
  return [...numberSet];
};

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

export { generateLottoNumbers };
