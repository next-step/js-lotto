import {
  MESSAGE,
  MIN_MONEY_UNIT,
  NUMBER_WITH_BONUS,
  PICKED_LOTTO_NUMBER_COUNT,
  RANGE_FOR_RANDOM_NUMBERS,
} from '../const/constant.js';
import { calculateRateOfProfit, prizeByCount, sum } from '../utils/index.js';

const validate = ({ winningNumbers, bonusNumber }) => {
  const isNotRange = num => num <= 0 && num > RANGE_FOR_RANDOM_NUMBERS;
  const needsToAlertForRange = winningNumbers.some(isNotRange) || isNotRange(bonusNumber);

  if (needsToAlertForRange) {
    throw MESSAGE.PLZ_CHECK_LOTTO_NUMBER_RANGE;
  }

  const winningNumbersSet = new Set(winningNumbers);
  if (winningNumbersSet.size !== PICKED_LOTTO_NUMBER_COUNT) {
    throw MESSAGE.PLZ_CHECK_DUPLICATED_LOTTO_NUMBER;
  }

  if (winningNumbers.some(num => num === bonusNumber)) {
    throw MESSAGE.PLZ_CHECK_DUPLICATED_BONUS_NUMBER;
  }

  return {
    winningNumbers,
    bonusNumber,
  };
};

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

const winningMap = {
  3: {
    count: 0,
    prize: 5_000,
  },
  4: {
    count: 0,
    prize: 50_000,
  },
  5: {
    count: 0,
    prize: 1_500_000,
  },
  6: {
    count: 0,
    prize: 2_000_000_000,
  },
  bonus: {
    count: 0,
    prize: 30_000_000,
  },
};

const getWinningKey = (count, hasBonusNumber) =>
  count === NUMBER_WITH_BONUS && hasBonusNumber ? 'bonus' : count;

const increaseWinningCount = (key, winningMap) => {
  const { count, prize } = winningMap[key];
  winningMap[key] = { prize, count: count + 1 };
};

const checkMatchedNumbers = (winningInfo, lottos) => {
  const { winningNumbers, bonusNumber } = winningInfo;

  const winningNumbersSet = new Set(winningNumbers);

  lottos.forEach(lotto => {
    const lottoSet = new Set(lotto);
    const intersection = new Set([...winningNumbersSet].filter(n => lottoSet.has(n)));
    const count = intersection.size;

    const winningKey = getWinningKey(count, lottoSet.has(bonusNumber));

    if (!winningMap[winningKey]) return;
    increaseWinningCount(winningKey, winningMap);
  });
};

const createStatisticsResult = lottoCount => {
  const winningInfo = Object.entries(winningMap);
  const prizeInfo = winningInfo.flatMap(([_, value]) => value);
  const totalAmount = lottoCount * MIN_MONEY_UNIT;

  return {
    winningInfo,
    rate: calculateRate(prizeInfo, totalAmount),
  };
};

export const getWinningStatistics = (winningInfo, lottos) => {
  try {
    checkMatchedNumbers(validate(winningInfo), lottos);
    return createStatisticsResult(lottos.length);
  } catch (e) {
    alert(e);
  }
};
