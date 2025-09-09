import { RANK_INFO } from '../constants/winnings.js';
import { DELIMITER } from '../constants/common.js';
import findDuplication from '../utils/findDuplication.js';

export const matchRankNameWithLine = (purchasedLine, lottoNumbers) => {
  const winningNumbersArray = lottoNumbers.winningNumbers
    .split(DELIMITER)
    .map((number) => Number(number));

  const convertBonusNumber = Number(lottoNumbers.bonusNumber);

  const duplicatedNumbers = findDuplication(purchasedLine, winningNumbersArray);

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

  const matchedRankNameWithLine = purchasedNumbers.map((purchasedLine) => {
    return matchRankNameWithLine(purchasedLine, lottoNumbers);
  });

  RANK_INFO.forEach((info) => {
    const count = matchedRankNameWithLine.filter((count) => {
      return count === info.name;
    });

    rankCountsMap[info.name] = count.length;
  });

  return rankCountsMap;
};
