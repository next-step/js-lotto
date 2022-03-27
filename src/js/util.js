import { RANDOM_INTEGER_CONDITION, LOTTO_LENGTH } from "./constants";

export const createLotto = () => {
  let result = [];
  while (result.length < LOTTO_LENGTH) {
    let randomInt = getRandomInteger(
      RANDOM_INTEGER_CONDITION.START,
      RANDOM_INTEGER_CONDITION.END
    );
    while (result.includes(randomInt)) {
      randomInt = getRandomInteger(
        RANDOM_INTEGER_CONDITION.START,
        RANDOM_INTEGER_CONDITION.END
      );
    }
    result.push(randomInt);
  }
  return result;
};

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
