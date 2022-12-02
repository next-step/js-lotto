import { $ } from './utils/DOM.js';
import { PERCENTAGE_UNIT, PRIZE_TYPES } from './constants/index.js';

const getPrizeType = ({ lotto, winningNumbers, bonus }) => {
  const hit = lotto.filter((number) => winningNumbers.includes(number)).length;
  const isBonus = lotto.includes(bonus);

  switch (hit) {
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return isBonus ? 'fiveBonus' : 'five';
    case 6:
      return 'six';
    default:
      return undefined;
  }
};

export const getPrizeTypeValue = (prizeType, prop) => {
  return prizeType === 'fiveBonus'
    ? PRIZE_TYPES.FIVE_BONUS[prop]
    : PRIZE_TYPES[prizeType.toUpperCase()][prop];
};

export const getPrizeCountState = ({ purchasedLottoNumbers, winningNumbers, bonus }) => {
  const prizeCountState = {
    three: 0,
    four: 0,
    five: 0,
    fiveBonus: 0,
    six: 0,
  };

  purchasedLottoNumbers.forEach((lotto) => {
    const rank = getPrizeType({ lotto, winningNumbers, bonus });

    if (rank !== undefined) {
      prizeCountState[rank] += 1;
    }
  });

  return prizeCountState;
};

export const getProfitRate = (prizeCountState) => {
  const price = $('.purchasing-lotto-input').valueAsNumber;
  const profit = Object.keys(prizeCountState).reduce(
    (acc, cur) => acc + getPrizeTypeValue(cur, 'money') * prizeCountState[cur],
    0,
  );

  return ((profit - price) / price) * PERCENTAGE_UNIT;
};
