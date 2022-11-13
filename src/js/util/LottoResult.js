import { NUMBER_DICTIONARY } from './Constant.js';

/**
 * @typedef {Object} LottoResult
 * @property {number} three
 * @property {number} four
 * @property {number} five
 * @property {number} six
 * @property {number} bonus
 */

const getMyHit = (ticket, winningNumbers, bonusNumber) => {
  const winningSet = new Set([...winningNumbers, bonusNumber]);

  let hit = 0;
  let bonusHit = 0;
  for (const number of ticket) {
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
export const getLottoResults = (tickets, winningNumbers = [], bonusNumber) => {
  const result = { three: 0, four: 0, five: 0, six: 0, bonus: 0 }; // bouns: 5+bonus
  const isBonusHit = (hit, bonusHit) => hit === 5 && bonusHit === 1;
  for (const ticket of tickets) {
    const [hitCount, bonusHitCount] = getMyHit(ticket, winningNumbers, bonusNumber);
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
  const prize = { three: 5000, four: 50000, five: 1500000, six: 2000000000, bonus: 30000000 };
  let sum = 0;
  for (const key of Object.keys(lottoResult)) {
    const value = lottoResult[key];
    if (value === 0) continue;
    sum += prize[key] * value;
  }
  return sum;
};

export const getMyEarningRate = (purchasingAmount = 0, pirzeMoney = 0) => {
  console.log(purchasingAmount, pirzeMoney);
  if (pirzeMoney - purchasingAmount <= 0) {
    return -1 * 100;
  }
  return ((pirzeMoney - purchasingAmount) / purchasingAmount) * 100;
};
