import { PRICE_PER_LOTTO, LOTTO_PRIZES } from "./constants.js";

export const calculateStatistics = (comparedResults) => {
  const matchedCount = new Map([
    ["3", 0],
    ["4", 0],
    ["5", 0],
    ["5bonus", 0],
    ["6", 0],
  ]);

  for (const result of comparedResults) {
    updateMatchedCount(matchedCount, {
      count: result.matchedNumbers.length,
      isBonusMatched: result.isBonusMatched,
    });
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

const updateMatchedCount = (matchedCount, { count, isBonusMatched }) => {
  const key = getMatchedKey(count, isBonusMatched);

  if (!matchedCount.has(key)) return;

  matchedCount.set(key, matchedCount.get(key) + 1);
};

const getMatchedKey = (count, isBonusMatched) => {
  if (count === 3 || count === 4 || count === 6) {
    return String(count);
  }
  if (count === 5 && isBonusMatched) {
    return "5bonus";
  }
  if (count === 5) {
    return String(count);
  }
  return undefined;
};
