import { LOTTO_NUMBERS } from './constants.js';
import { lottoPrices } from './lottoPrices.js';

export function getRandomNumber() {
  return Math.floor(Math.random() * LOTTO_NUMBERS.LOTTO_MAX_NUM) + 1;
}

export function changeObjectToSet(object) {
  return new Set(Object.values(object));
}

export function countByRank(ranks, size) {
  const rankCounts = Array(size).fill(0);
  ranks.forEach(rank => {
    if (rank === 0) return;
    rankCounts[rank - 1]++;
  });

  return rankCounts;
}

export function calculateEarningRate(purchasedPrice, rankCounts) {
  return (sumTotalProfit(rankCounts, lottoPrices) / purchasedPrice - 1) * 100;
}

export function sumTotalProfit(array, standard) {
  return array.reduce((sum, currentValue, idx) => {
    return sum + currentValue * standard[idx].price;
  }, 0);
}
