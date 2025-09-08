import { RANK_INFO } from '../constants/winnings.js';
import { DELIMITER } from '../constants/common.js';

export const matchWithLottoNumbers = (purchasedLine, lottoNumbers) => {
  let duplicatedNumbers = [];

  const winningNumbersArray = lottoNumbers.winningNumbers
    .split(DELIMITER)
    .map((number) => Number(number));

  const convertBonusNumber = Number(lottoNumbers.bonusNumber);

  purchasedLine.forEach((purchasedNumber) => {
    const findSameNumber = winningNumbersArray.find((winningNumber) => {
      return winningNumber === purchasedNumber;
    });

    if (findSameNumber) {
      duplicatedNumbers = [...duplicatedNumbers, findSameNumber];
    }
  });

  if (duplicatedNumbers.length === 5) {
    const isMatchedWithBonusNumber = purchasedLine.includes(convertBonusNumber);

    if (isMatchedWithBonusNumber) {
      return 'second';
    }

    return 'third';
  }

  const findRank = RANK_INFO.find(
    (info) => info.matchCount === duplicatedNumbers.length,
  );

  if (findRank) {
    return findRank.name;
  }
};

export const createRankCountsMap = (purchasedNumbers, lottoNumbers) => {
  const rankCountsMap = {};

  const matchedRankNameByLotto = purchasedNumbers.map((purchasedLine) => {
    return matchWithLottoNumbers(purchasedLine, lottoNumbers);
  });

  RANK_INFO.forEach((info) => {
    const count = matchedRankNameByLotto.filter((count) => {
      return count === info.name;
    });

    rankCountsMap[info.name] = count.length;
  });

  return rankCountsMap;
};
