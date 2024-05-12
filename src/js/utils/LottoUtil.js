import { generateRandomNumber } from './index';
import { LOTTO } from '../constants';

export function generateLottoNumberArray() {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < LOTTO.WINNING_NUMBER_LENGTH) {
    lottoNumbers.add(
      generateRandomNumber(
        LOTTO.MIN_WINNING_NUMBER_RANGE,
        LOTTO.MAX_WINNING_NUMBER_RANGE
      )
    );
  }
  return [...lottoNumbers];
}

export function isValidLottoNumber(number) {
  return (
    Number.isInteger(number) &&
    number >= LOTTO.MIN_WINNING_NUMBER_RANGE &&
    number <= LOTTO.MAX_WINNING_NUMBER_RANGE
  );
}

export function isValidLottoNumberArray(numbers) {
  return (
    Array.isArray(numbers) &&
    new Set(numbers).size === LOTTO.WINNING_NUMBER_LENGTH &&
    numbers.every((number) => isValidLottoNumber(number))
  );
}

export function hasBonusNumber(lottoNumbers, bonusNumber) {
  return lottoNumbers.includes(bonusNumber);
}

export function getLottoNumberMatchCount(winningNumbers, lottoNumbers) {
  return winningNumbers.reduce(
    (count, winningNumber) =>
      lottoNumbers.includes(winningNumber) ? count + 1 : count,
    0
  );
}

export function getWinningRank(matchCount, isBonusNumberMatch) {
  switch (matchCount) {
    case 6:
      return LOTTO.RANK_1;
    case 5:
      return isBonusNumberMatch ? LOTTO.RANK_2 : LOTTO.RANK_3;
    case 4:
      return LOTTO.RANK_4;
    case 3:
      return LOTTO.RANK_5;
    default:
      return LOTTO.UNRANKED;
  }
}

export function getAmount(matchCount, isBonusNumberMatch, winningAmount) {
  switch (matchCount) {
    case 6:
      return winningAmount[0];
    case 5:
      return isBonusNumberMatch ? winningAmount[1] : winningAmount[2];
    case 4:
      return winningAmount[3];
    case 3:
      return winningAmount[4];
    default:
      return winningAmount[5];
  }
}
