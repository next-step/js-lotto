import { RANGE, LOTTERY_COUNT } from "./const.js";

export function generateLottery() {
  let nums = new Set();
  while (nums.size < LOTTERY_COUNT) {
    nums.add(Math.floor(Math.random() * (RANGE - 1 + 1) + 1));
  }
  return [...nums].sort((a, b) => a - b);
}

export const generateLotteries = (numbers) => {
  const result = [];
  for (let i = 0; i < numbers; i++) {
    result.push(generateLottery());
  }
  return result;
};

export const checkWinningNumbers = ({ winningNumbers, bonusNumber, lottoNumbers, result }) => {
  const sortedWinningNumbers = winningNumbers.sort((a, b) => a - b);
  let leftIndex = 0;
  let rightIndex = 0;
  let tmpIndex = 0;
  let i = 0;

  while(i < lottoNumbers.length) {
    const lotto = lottoNumbers[i];
    let count = 0;

    while(leftIndex < lotto.length && rightIndex < sortedWinningNumbers.length && tmpIndex < lotto.length) {
      if (lotto[leftIndex] === sortedWinningNumbers[rightIndex]) {
        count++;
        leftIndex++;
        tmpIndex = tmpIndex + 1;
        rightIndex = tmpIndex;
      } else {
        rightIndex++;
      }
    }

    if (count > 2) {
      if (count === 5 && lotto.some((l) => l === bonusNumber)) {
        result[`lotto-${count}-bonus`].count = result[`lotto-${count}-bonus`].count + 1;
      } else {
        result[`lotto-${count}`].count = result[`lotto-${count}`].count + 1;
      }
    }
    i++;
    count = 0;
    leftIndex = 0;
    rightIndex = 0;
    tmpIndex = 0;
  }
  return result;
};

export const calculateProfit = (result, price) => {
  const profit = Object.values(result).reduce((acc, cur) => {
    const count = cur.count;
    const price = cur.price;
    if (count > 0) {
      return acc + count * price;
    }
    return acc;
  }, 0);

  return profit / price;
};
