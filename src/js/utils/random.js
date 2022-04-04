import { MAX_LOTTO } from '../constants/lotto.js';

export const createRandomNumber = () => {
  return Math.floor(Math.random() * MAX_LOTTO) + 1;
};
