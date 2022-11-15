import { LOTTO } from '../constants/index.js';
import { generateRandomNumbersToArray } from '../utils/index.js';

export const getLottoPurchaseCount = (lottoPurchasePrice) => {
  return lottoPurchasePrice / LOTTO.PRICE;
};

export const generateLottoNumbersToArray = (count) => {
  return [...Array(count)].map(() =>
    generateRandomNumbersToArray(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, LOTTO.NUMBER_AMOUNT),
  );
};
