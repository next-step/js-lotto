import { getJackpotTargetRankInfo } from '../jackpot/utils.js';

const RANK_KEYS = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'];

export const getProfitRate = (initialAmount, finalAmount) => {
  const profitPercent = ((finalAmount - initialAmount) / initialAmount) * 100;

  return profitPercent % 1 === 0
    ? profitPercent
    : Math.floor(profitPercent * 10) / 10;
};

export const getStatisticsResult = (lottoResult) => {
  return RANK_KEYS.reverse().reduce((object, key, index) => {
    const targetRank = RANK_KEYS.length - index;

    return {
      ...object,
      [key]: getJackpotTargetRankInfo(targetRank, lottoResult),
    };
  }, {});
};
