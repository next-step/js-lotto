import { LOTTO } from "../constants/lotto.js";

export const makeRandomNumber = () =>
  Math.floor(Math.random() * LOTTO.MAX_NUMBER) + LOTTO.MIN_NUMBER;

const isDuplicated = (arr, length) => new Set(arr).size !== length;

export const createRandomNumbers = () => {
  let randomNumbers = Array.from({ length: LOTTO.TOTAL_NUMBER_COUNT }, () =>
    makeRandomNumber()
  );

  if (isDuplicated(randomNumbers, LOTTO.TOTAL_NUMBER_COUNT))
    return createRandomNumbers();

  return randomNumbers;
};
