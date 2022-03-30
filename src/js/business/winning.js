import { sum } from '../utils/index.js';

/**
 * 수익률(%) = ((당첨금액 / 복권 구매금액) * 100) - 100;
 * @param {number} totalPrize 당첨금액
 * @param {number} investmentAmount 투자금액 (복권 구매금액)
 * @returns number 수익률
 */
const calculateRateOfProfit = (totalPrize, investmentAmount) =>
  (totalPrize / investmentAmount) * 100 - 100;

const prizeByCount = ({ count, prize }) => count * prize;

/**
 *
 * @param {{ count: number; prize: number }} prizeInfo
 * @param {number} totalAmount
 * @returns number 수익률
 */
export const calculateRate = (prizeInfo, totalAmount) => {
  const totalPrize = prizeInfo.map(prizeByCount).reduce(sum);
  return calculateRateOfProfit(totalPrize, totalAmount);
};
