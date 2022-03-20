import { LOTTO_END_NUMBER, LOTTO_START_NUMBER } from '../constants.js';

export const pickRandomIntegerNumber = (start, end) => Math.floor(Math.random() * end) + start;

export const pickRandomNumbers = count => {
  const randomNumbers = new Set();

  while (randomNumbers.size !== count) {
    randomNumbers.add(pickRandomIntegerNumber(LOTTO_START_NUMBER, LOTTO_END_NUMBER));
  }

  return [...randomNumbers];
};
