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

export const ENUM_PRIZE_MONEY = {
  PRIZE_MONEY_3: 5000,
  PRIZE_MONEY_4: 50_000,
  PRIZE_MONEY_5: 1_500_000,
  PRIZE_MONEY_5_WITH_BONUS: 30_000_000,
  PRIZE_MONEY_6: 2_000_000_000,
  5000: "PRIZE_MONEY_3",
  50_000: "PRIZE_MONEY_4",
  1_500_000: "PRIZE_MONEY_5",
  30_000_000: "PRIZE_MONEY_5_WITH_BONUS",
  2_000_000_000: "PRIZE_MONEY_6",
};

/**
 *
 * @param {number} matchedCount
 * @param {boolean} isIncludeBonus
 */
export const calculateProfit = ({ matchedCount, isIncludeBonus = false }) => {
  if (matchedCount === 3) {
    return ENUM_PRIZE_MONEY.PRIZE_MONEY_3;
  }
  if (matchedCount === 4) {
    return ENUM_PRIZE_MONEY.PRIZE_MONEY_4;
  }
  if (matchedCount === 5) {
    return isIncludeBonus
      ? ENUM_PRIZE_MONEY.PRIZE_MONEY_5_WITH_BONUS
      : ENUM_PRIZE_MONEY.PRIZE_MONEY_5;
  }
  if (matchedCount === 6) {
    return ENUM_PRIZE_MONEY.PRIZE_MONEY_6;
  }
  return 0;
};
