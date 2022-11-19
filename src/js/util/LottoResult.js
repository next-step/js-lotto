import { NUMBER_DICTIONARY } from './Constant.js';

/**
 * @typedef {Object} LottoResult
 * @property {number} three
 * @property {number} four
 * @property {number} five
 * @property {number} six
 * @property {number} bonus
 */

const getMyHit = (lotto, winningNumbers, bonusNumber) => {
  const winningSet = new Set([...winningNumbers, bonusNumber]);

  let hit = 0;
  let bonusHit = 0;
  for (const number of lotto) {
    if (winningSet.has(number)) {
      hit += 1;
      continue;
    }
    if (number === bonusNumber) {
      bonusHit += 1;
    }
  }
  return [hit, bonusHit];
};

/** @type {LottoResult} */
export const getLottoResults = (lottos, winningNumbers = [], bonusNumber) => {
  const result = { three: 0, four: 0, five: 0, six: 0, bonus: 0 }; // bouns: 5+bonus
  const isBonusHit = (hit, bonusHit) => hit === 5 && bonusHit === 1;

  for (const lotto of lottos) {
    const [hitCount, bonusHitCount] = getMyHit(lotto, winningNumbers, bonusNumber);
    if (hitCount < 3) continue;
    if (isBonusHit(hitCount, bonusHitCount)) {
      result.bonus += 1;
      continue;
    }
    result[NUMBER_DICTIONARY[hitCount]] += 1;
  }
  return result;
};

export const getMyPrizeAmount = (lottoResult = { three: 0, four: 0, five: 0, six: 0, bonus: 0 }) => {
  const prize = { three: 5_000, four: 50_000, five: 1_500_000, six: 2_000_000_000, bonus: 30_000_000 };
  let sum = 0;
  for (const key of Object.keys(lottoResult)) {
    const value = lottoResult[key];
    if (value === 0) continue;
    sum += prize[key] * value;
  }
  return sum;
};

export const getMyEarningRate = (purchasingAmount = 0, pirzeMoney = 0) => {
  if (pirzeMoney - purchasingAmount <= 0) {
    return -1 * 100;
  }
  return ((pirzeMoney - purchasingAmount) / purchasingAmount) * 100;
};
