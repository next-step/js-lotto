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
