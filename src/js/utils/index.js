import { LOTTO } from '../constants.js';

export const pickRandomIntegerNumber = (start, end) => Math.floor(Math.random() * end) + start;

export const pickRandomNumbers = count => {
  const randomNumbers = new Set();

  while (randomNumbers.size !== count) {
    randomNumbers.add(pickRandomIntegerNumber(LOTTO.START_NUMBER, LOTTO.END_NUMBER));
  }

  return [...randomNumbers];
};
