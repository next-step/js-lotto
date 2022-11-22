import { MESSAGE } from '../util/Constant.js';
import { LOTTO_NUMBER, LOTTO_PRICE } from './Constant.js';

/**
 * @param {number} purchasingAmount
 */
export const buy = (purchasingAmount) => {
  if (purchasingAmount % LOTTO_PRICE) throw new Error(MESSAGE.INVALID_AMOUNT_UNIT);

  const amount = purchasingAmount / LOTTO_PRICE;
  return Array.from({ length: amount }).map(() => generateLottoNumbers());
};

/** @returns {number[]} */
function generateLottoNumbers() {
  const numbers = Array.from({ length: LOTTO_NUMBER.MAX }).map((_, n) => n + 1);
  const lottoNumbers = numbers.sort(() => Math.random() - 0.5).slice(0, LOTTO_NUMBER.LENGTH);
  return lottoNumbers.sort((a, b) => a - b);
}
