import { calculateLottoTicketLimit } from "./lotto.js";
import { getReward, getRank } from "../src/getRank.js";

export const checkResult = (winningNumbers, lotto) => {
  const count = calculateLottoTicketLimit(lotto.budget);
  const result = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < count; i++) {
    const winningRank = getRank(winningNumbers, lotto.numbers[i]);
    result[winningRank - 1] += 1;
  }

  return result;
};

export const computeTotalPrize = (winningArr) => {
  return winningArr.reduce(
    (prev, _, index, arr) => prev + getReward(index + 1) * arr[index],
    0
  );
};

export const calculateLottoProfitRatio = (totalWinnings, totalSpent) => {
  return ((totalWinnings - totalSpent) / totalSpent) * 100;
};
