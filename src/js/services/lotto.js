import { countSameNumberInTwoArray } from '../utils/index.js';
import { LOTTO_WINNING_REVENUE } from '../constants.js';

const isSameBonusNumber = (array1, array2) => array1.at(-1) === array2.at(-1);

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
    switch (sameCount) {
      case 3:
        winningResult.fifth += 1;
        break;
      case 4:
        winningResult.fourth += 1;
        break;
      case 5:
        winningResult.third += 1;
        break;
      case 6:
        if (isSameBonusNumber(winningLottoNumbers, purchaseLottoNumbers)) winningResult.second += 1;
        else winningResult.first += 1;
        break;
      default:
        break;
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
