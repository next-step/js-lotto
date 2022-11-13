import { LOTTO } from '../constants/index.js';
import { generateRandomNumbersToArray } from '../utils/index.js';

export const generateLottoNumbersToArray = (count) => {
  const array = [];

  for (let i = 0; i < count; i++) {
    array.push(generateRandomNumbersToArray(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, LOTTO.NUMBER_AMOUNT));
  }

  return array;
};
