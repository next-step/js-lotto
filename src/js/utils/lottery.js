import { RANGE, LOTTERY_COUNT } from "./const.js";

export function generateLottery() {
  let nums = new Set();
  while (nums.size < LOTTERY_COUNT) {
    nums.add(Math.floor(Math.random() * (RANGE - 1 + 1) + 1));
  }
  return [...nums];
}

export const generateLotteries = (numbers) => {
  const result = [];
  for (let i = 0; i < numbers; i++) {
    result.push(generateLottery());
  }
  return result;
};
