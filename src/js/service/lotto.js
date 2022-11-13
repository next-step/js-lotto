import { LOTTO_END_NUMBER, LOTTO_NUMBER_COUNT_LIMIT, LOTTO_START_NUMBER } from '../constants/lotto.js';
import { generateRandomNumbersToArray } from '../utils/index.js';

export const generateLottoNumbersToArray = (count) => {
  const array = [];

  for (let i = 0; i < count; i++) {
    array.push(generateRandomNumbersToArray(LOTTO_START_NUMBER, LOTTO_END_NUMBER, LOTTO_NUMBER_COUNT_LIMIT));
  }

  return array;
};
