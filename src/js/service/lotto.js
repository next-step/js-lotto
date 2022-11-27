import { LOTTO, PERCENTAGE_NUMBER } from '../constants/index.js';
import { generateRandomNumbersToArray } from '../utils/index.js';
import { getLottoWinningBonusNumber, getLottoWinningNumberArray } from '../view/lotto.js';

export const getLottoPurchaseCount = (lottoPurchasePrice) => {
  return lottoPurchasePrice / LOTTO.PRICE;
};

export const generateLottoNumbersToArray = (count) => {
  return [...Array(count)].map(() =>
    generateRandomNumbersToArray(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, LOTTO.NUMBER_AMOUNT),
  );
};

export const getLottoWinningNumbers = () => {
  const lottoWinningNumbers = getLottoWinningNumberArray();

  const lottoBonusNumber = getLottoWinningBonusNumber();

  return {
    winning: lottoWinningNumbers,
    bonus: lottoBonusNumber,
  };
};

export const getLottoRank = (lottoNumberArray, winningNumbers, bonusNumber) => {
  const matchCount = lottoNumberArray.reduce((acc, cur) => {
    return winningNumbers.includes(cur) ? acc + 1 : acc;
  }, 0);

  if (matchCount === 5) {
    return lottoNumberArray.includes(bonusNumber) ? '5_BONUS' : 5;
  }

  return matchCount;
};

const getProfit = (winningCount) => {
  const keys = Object.keys(winningCount);

  return keys.reduce((acc, cur) => {
    return acc + LOTTO.WINNING_PRICE[cur] * winningCount[cur];
  }, 0);
};

export const getRateOfReturn = (winningCount, lottoPurchasePrice) => {
  const profit = getProfit(winningCount);
  if (profit === 0) return 0;

  return Math.round(((profit - lottoPurchasePrice) / lottoPurchasePrice) * PERCENTAGE_NUMBER);
};
