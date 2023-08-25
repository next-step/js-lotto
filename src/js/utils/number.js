import { ERROR_MESSAGE } from '../constants/error-message.js';

export const getRandomNumber = (from, to) => {
  if (from > to) {
    throw new Error(ERROR_MESSAGE.NOT_VALID_RANDOM_RANGE);
  }
  const range = to - from + 1;
  return Math.floor(Math.random() * range) + from;
};

export const calculateRateOfReturn = (earnings, investment) => {
  if (typeof earnings !== 'number' || typeof investment !== 'number') {
    throw new Error('숫자만 입력가능합니다.');
  }
  return ((earnings - investment) / investment) * 100;
};
