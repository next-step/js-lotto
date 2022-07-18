import { MAX_LOTTO_NUM, MIN_LOTTO_NUM } from "./constants.js";

export const createRandomNums = () => {
  const randomNums = new Set();

  for (let i = 1; i < 6; i++) {
    randomNums.add(
      Math.floor(
        Math.random() * (MAX_LOTTO_NUM - MIN_LOTTO_NUM) + MIN_LOTTO_NUM
      )
    );
  }
  return randomNums;
};
