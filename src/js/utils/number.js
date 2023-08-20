import { ERROR_MESSAGE } from '../constants/error-message.js';

export const getRandomNumber = (from, to) => {
  if (from > to) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_RANDOM_RANGE);
  }
  const range = to - from + 1;
  return Math.floor(Math.random() * range) + from;
};
