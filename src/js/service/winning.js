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

const generateWinningInfo = prize => ({
  count: 0,
  prize,
});

const winningMap = (() => {
  const map = new Map();

  // key: 일치 갯수
  map.set(3, generateWinningInfo(5_000));
  map.set(4, generateWinningInfo(50_000));
  map.set(5, generateWinningInfo(1_500_000));
  map.set(6, generateWinningInfo(2_000_000_000));
  map.set('bonus', generateWinningInfo(30_000_000));

  return map;
})();

const getWinningKey = (count, hasBonusNumber) =>
  count === NUMBER_WITH_BONUS && hasBonusNumber ? 'bonus' : count;

const increaseWinningCount = (key, winningMap) => {
  const { count, ...rest } = winningMap.get(key);
  winningMap.set(key, { ...rest, count: count + 1 });
};

const checkMatchedNumbers = (winningInfo, lottos) => {
  const { winningNumbers, bonusNumber } = winningInfo;

  const winningNumbersSet = new Set(winningNumbers);

  lottos.forEach(lotto => {
    const lottoSet = new Set(lotto);
    const intersection = new Set([...winningNumbersSet].filter(n => lottoSet.has(n)));
    const count = intersection.size;

    const winningKey = getWinningKey(count, lottoSet.has(bonusNumber));

    if (!winningMap.has(winningKey)) return;
    increaseWinningCount(winningKey, winningMap);
  });
};

const createStatisticsResult = lottoCount => {
  const winningInfo = [...winningMap.entries()];
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
