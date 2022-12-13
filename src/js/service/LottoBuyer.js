import { LOTTO_NUMBER, LOTTO_PRICE } from './Constant.js';

/**
 * @typedef {Object} LottoInfo
 * @property {number} total
 * @property {number} manual
 * @property {number} auto
 */

/**
 * @param {number} purchasingAmount
 * @param {?number[][]} manualNumberLottos
 */
export const buy = (purchasingAmount, manualNumberLottos) => {
  const { auto } = getLottoInfo(purchasingAmount, manualNumberLottos.length);

  const automaticallyGeneratedLottos = Array.from({ length: auto }).map(() => generateLottoNumbers());
  return [...manualNumberLottos, ...automaticallyGeneratedLottos];
};

/** @returns {number[]} */
export function generateLottoNumbers() {
  const numbers = Array.from({ length: LOTTO_NUMBER.MAX }).map((_, n) => n + 1);
  const lottoNumbers = numbers.sort(() => Math.random() - 0.5).slice(0, LOTTO_NUMBER.LENGTH);
  return lottoNumbers.sort((a, b) => a - b);
}

/**
 *
 * @param {number} purchasingAmount
 * @param {number} manualCount
 * @returns {LottoInfo}
 */
export function getLottoInfo(purchasingAmount, manualCount) {
  return {
    total: purchasingAmount / LOTTO_PRICE,
    manual: manualCount,
    auto: purchasingAmount / LOTTO_PRICE - manualCount,
  };
}
