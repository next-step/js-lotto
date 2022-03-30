import { calculateRate } from '../business/winning.js';
import { PICKED_LOTTO_NUMBER_COUNT } from '../const/constant.js';

const validate = ({ winningNumbers, bonusNumber }) => {
  const isNotRange = num => num <= 0 && num > 45;
  const needsToAlertForRange = winningNumbers.some(isNotRange) || isNotRange(bonusNumber);

  if (needsToAlertForRange) {
    throw '1 ~ 45 사이 숫자를 입력해주세요.';
  }

  const winningNumbersSet = new Set(winningNumbers);
  if (winningNumbersSet.size !== PICKED_LOTTO_NUMBER_COUNT) {
    throw '중복된 당첨 번호가 있습니다. 확인해주세요.';
  }

  if (winningNumbers.some(num => num === bonusNumber)) {
    throw '당첨 번호와 보너스 번호가 중복됩니다. 확인해주세요.';
  }

  return {
    winningNumbers,
    bonusNumber,
  };
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

const getWinningKey = (count, hasBonusNumber) => (count === 5 && hasBonusNumber ? 'bonus' : count);

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
  const totalAmount = lottoCount * 1000;

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
