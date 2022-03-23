import { countSameNumberInTwoArray } from '../utils/index.js';

export const getWinningResult = (winningLottoNumbers, purchaseLottoNumbersArray) => {
  const winningResult = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  purchaseLottoNumbersArray.forEach(array => {
    const sameCount = countSameNumberInTwoArray(winningLottoNumbers, array);
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
        if (array.at(-1) === winningLottoNumbers.at(-1)) winningResult.second += 1;
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
    fifth * 5000 + fourth * 50000 + third * 1500000 + second * 30000000 + first * 2000000000;
  const totalYield = ((totalRevenue - purchasePrice) / purchasePrice) * 100;
  return totalYield;
};
