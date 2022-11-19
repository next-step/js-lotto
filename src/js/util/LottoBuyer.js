import { MESSAGE } from './Constant.js';

/**
 * @param {number} purchasingAmount
 */
export const buy = (purchasingAmount) => {
  if (purchasingAmount % 1000) throw new Error(MESSAGE.INVALID_AMOUNT_UNIT);

  const amount = purchasingAmount / 1000;
  return Array.from({ length: amount }).map(() => generateLottoNumbers());
};

/** @returns {number[]} */
function generateLottoNumbers() {
  const numbers = Array.from({ length: 45 }).map((_, n) => n + 1);
  const lottoNumbers = numbers.sort(() => Math.random() - 0.5).slice(0, 6);
  return lottoNumbers.sort((a, b) => a - b);
}
