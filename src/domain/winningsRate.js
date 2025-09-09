import { RANK_INFO } from '../constants/winnings.js';

const calculateRankWinnings = (rankCount, rankMoney) => {
  return rankCount * rankMoney;
};

const calculateTotalWinnings = (rankCountsMap) => {
  return RANK_INFO.reduce((totalWinnings, info) => {
    const rankCount = rankCountsMap[info.name];
    return totalWinnings + calculateRankWinnings(rankCount, info.money);
  }, 0);
};

export const calculateWinningsRate = (amountPaid, rankCountsMap) => {
  const totalWinnings = calculateTotalWinnings(rankCountsMap);

  return (totalWinnings / amountPaid) * 100;
};
