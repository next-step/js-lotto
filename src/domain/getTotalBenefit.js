import {PRIZE_BENEFIT} from './constants';

export const getTotalBenefit = lottoResult => {
  return Object.entries(lottoResult).reduce((acc, [prize, count]) => {
    const prizePrice = PRIZE_BENEFIT[prize] * count;
    return acc + prizePrice;
  }, 0);
};
