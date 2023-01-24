import { canIGetAwards, LOTTO_HIT_COUNT, LOTTO_PRIZE_AMOUNT, LOTTO_PRIZE_CONDITION } from '../service/Constant.js';

/**
 * @typedef {Object} LottoResult
 * @property {number} FIRST
 * @property {number} SECOND
 * @property {number} THIRD
 * @property {number} FOURTH
 * @property {number} FIFTH
 */

/**
 * @typedef {Object} HitCount
 * @property {number} hit
 * @property {number} bonus
 */

/**
 * @param {number[][]} lottos
 * @param {number[]} winningNumbers
 * @param {number} bonusNumber
 * @returns {HitCount}
 */
export const getMyHit = (myLotto, winningNumbers, bonusNumber) => {
  return {
    hit: myLotto.filter((n) => winningNumbers.includes(n)).length,
    bonus: myLotto === bonusNumber ? 1 : 0,
  };
};

/**
 * @param {HitCount} prizeCondition
 * @param {HitCount} myHit
 * @returns {boolean}
 */
export const isMatchedLottoPrizeCondition = (prizeCondition, myHit) => {
  const { hit, bonus } = prizeCondition;
  const { hit: myHitCount, bonus: myBonus } = myHit;
  return hit === myHitCount && bonus === myBonus;
};

/**
 * @param {number[][]} lottos
 * @param {number[]} winningNumbers
 * @param {number} bonusNumber
 * @returns {LottoResult}
 */
export const getLottoResults = (lottos, winningNumbers, bonusNumber) => {
  const myHits = lottos
    .map((lotto) => getMyHit(lotto, winningNumbers, bonusNumber))
    .filter(({ hit, bonus }) => canIGetAwards(hit, bonus));

  return Object.keys(LOTTO_PRIZE_CONDITION).reduce(
    (result, key) =>
      myHits.find((myHit) => isMatchedLottoPrizeCondition(LOTTO_PRIZE_CONDITION[key], myHit))
        ? { ...result, [key]: (result[key] || 0) + 1 }
        : result,
    { ...LOTTO_HIT_COUNT }
  );
};

/**
 * @param {LottoResult} lottoResult
 * @returns {number}
 */
export const getMyPrizeAmount = (lottoResult) => {
  return Object.keys(lottoResult).reduce((sum, key) => sum + LOTTO_PRIZE_AMOUNT[key] * lottoResult[key], 0);
};

/**
 * @param {number} purchasingAmount
 * @param {number} pirzeMoney
 * @returns {number}
 */
export const getMyEarningRate = (purchasingAmount = 0, pirzeMoney = 0) => {
  if (pirzeMoney - purchasingAmount < 0) {
    return -1 * 100;
  }
  return ((pirzeMoney - purchasingAmount) / purchasingAmount) * 100;
};
