import { RANK_INFO } from '../constants/winnings.js';

const calculateRankWinnings = (rankCount, rankMoney) => {
  return rankCount * rankMoney;
};

const calculateTotalWinnings = (rankCountsMap) => {
  let totalWinnings = 0;

  RANK_INFO.forEach((info) => {
    const rankCount = rankCountsMap[info.name];

    totalWinnings += calculateRankWinnings(rankCount, info.money);
  });

  console.log(totalWinnings);

  return totalWinnings;
};

export const calculateWinningsRate = (amountPaid, rankCountsMap) => {
  const totalWinnings = calculateTotalWinnings(rankCountsMap);

  return (totalWinnings / amountPaid) * 100;
};
