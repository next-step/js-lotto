import { PRICE } from "../constants/constants.mjs";

export const drawLots = () => {
  const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
  return numbers.sort(() => Math.random() - 0.5).slice(0, 6);
};

export const calculateLotto = (receivedMoney) => {
  if (receivedMoney < 0) {
    return 0;
  }
  return Math.floor(receivedMoney / PRICE);
};

export const getLottos = (count) =>
  Array.from({ length: count }, () => drawLots());

const PRIZE_MONEY_3 = 5000;
const PRIZE_MONEY_4 = 50_000;
const PRIZE_MONEY_5 = 1_500_000;
const PRIZE_MONEY_5_WITH_BONUS = 30_000_000;
const PRIZE_MONEY_6 = 2_000_000_000;
/**
 *
 * @param {number} matchedCount
 * @param {boolean} isIncludeBonus
 */
export const calculateProfit = ({ matchedCount, isIncludeBonus = false }) => {
  if (matchedCount === 3) {
    return PRIZE_MONEY_3;
  }
  if (matchedCount === 4) {
    return PRIZE_MONEY_4;
  }
  if (matchedCount === 5) {
    return isIncludeBonus ? PRIZE_MONEY_5_WITH_BONUS : PRIZE_MONEY_5;
  }
  if (matchedCount === 6) {
    return PRIZE_MONEY_6;
  }
  return 0;
};
