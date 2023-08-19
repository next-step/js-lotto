import {PRIZE_MAP} from './constants';

export const getTotalBenefit = lottoResult => {
  return Object.entries(lottoResult).reduce((acc, [prize, count]) => {
    const prizePrice = PRIZE_MAP[prize] * count;
    return acc + prizePrice;
  }, 0);
};
