import { PRICE_PER_LOTTO, LOTTO_PRIZES } from "./constants.js";

export const calculateStatistics = (comparedResults) => {
  const matchedCount = new Map([
    ["3", 0],
    ["4", 0],
    ["5", 0],
    ["5bonus", 0],
    ["6", 0],
  ]);

  const MIN_MATCHED_COUNT = 3;

  const filteredResults = comparedResults.filter(
    (result) => result.matchedNumbers.length >= MIN_MATCHED_COUNT
  );

  for (const result of filteredResults) {
    const key = getMatchedKey(result);
    matchedCount.set(key, (matchedCount.get(key) ?? 0) + 1);
  }

  const totalPrize = [...matchedCount.keys()].reduce(
    (prev, key) => prev + (LOTTO_PRIZES[key] ?? 0) * matchedCount.get(key),
    0
  );

  const totalSpending = comparedResults.length * PRICE_PER_LOTTO;
  const profitRate = (totalPrize / totalSpending) * 100;

  return {
    matchedCount,
    profitRate,
  };
};

const getMatchedKey = ({ matchedNumbers, isBonusMatched }) => {
  const matchCount = matchedNumbers.length;
  if (matchCount === 5 && isBonusMatched) return "5bonus";
  return String(matchCount);
};
