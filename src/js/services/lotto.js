import { countSameNumberInTwoArray } from '../utils/index.js';
import { LOTTO_WINNING_REVENUE } from '../constants.js';

const isSameBonusNumber = (array1, array2) => array1.at(-1) === array2.at(-1);

const getRankingFromSameCount = {
  3: () => 'fifth',
  4: () => 'fourth',
  5: () => 'third',
  6: isSecond => (isSecond ? 'second' : 'first'),
};

export const getWinningResult = (winningLottoNumbers, purchaseLottoNumbersArray) => {
  const winningResult = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  purchaseLottoNumbersArray.forEach(purchaseLottoNumbers => {
    const sameCount = countSameNumberInTwoArray(winningLottoNumbers, purchaseLottoNumbers);
    if (sameCount === 6) {
      const isSecond = isSameBonusNumber(winningLottoNumbers, purchaseLottoNumbers);
      winningResult[getRankingFromSameCount[sameCount](isSecond)] += 1;
    } else if (sameCount > 2) {
      winningResult[getRankingFromSameCount[sameCount]()] += 1;
    }
  });
  return winningResult;
};

export const getTotalYield = (purchasePrice, winningResult) => {
  const { first, second, third, fourth, fifth } = winningResult;
  const totalRevenue =
    fifth * LOTTO_WINNING_REVENUE.FIFTH +
    fourth * LOTTO_WINNING_REVENUE.FOURTH +
    third * LOTTO_WINNING_REVENUE.THIRD +
    second * LOTTO_WINNING_REVENUE.SECOND +
    first * LOTTO_WINNING_REVENUE.FIRST;
  const totalYield = ((totalRevenue - purchasePrice) / purchasePrice) * 100;
  return totalYield;
};
