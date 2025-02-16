import { PRICE_PER_LOTTO, LOTTO_PRIZES } from "./constants.js";

export const calculateStatistics = (comparedResults) => {
  const matchedCount = new Map(
    Object.keys(LOTTO_PRIZES).map((key) => [key, 0])
  );

  for (const result of comparedResults) {
    updateMatchedCount(matchedCount, result);
  }

  const totalPrize = [...matchedCount.keys()].reduce(
    (prev, key) => prev + LOTTO_PRIZES[key] * matchedCount.get(key),
    0
  );

  const totalSpending = comparedResults.length * PRICE_PER_LOTTO;
  const profitRate = (totalPrize / totalSpending) * 100;

  return {
    matchedCount,
    profitRate,
  };
};

const updateMatchedCount = (
  matchedCount,
  { matchedNumbers, isBonusMatched }
) => {
  const count = matchedNumbers.length;

  let key = "";

  if (count === 3 || count === 4 || count === 6) {
    key = String(count);
  } else if (count === 5 && isBonusMatched) {
    key = "5bonus";
  } else if (count === 5) {
    key = String(count);
  }

  if (!matchedCount.has(key)) return;

  matchedCount.set(key, matchedCount.get(key) + 1);
};
