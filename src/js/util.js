import { RANDOM_INTEGER_CONDITION, LOTTO_LENGTH } from "./constants.js";

export const createLotto = () => {
  const lottoArray = Array(LOTTO_LENGTH)
    .fill(0)
    .map(() =>
      getRandomInteger(
        RANDOM_INTEGER_CONDITION.START,
        RANDOM_INTEGER_CONDITION.END
      )
    );
  const lottoSet = new Set(lottoArray);
  while (lottoSet.size < LOTTO_LENGTH) {
    lottoSet.add(
      getRandomInteger(
        RANDOM_INTEGER_CONDITION.START,
        RANDOM_INTEGER_CONDITION.END
      )
    );
  }
  return [...lottoSet];
};

export const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
