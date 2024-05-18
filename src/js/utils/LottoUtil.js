import { generateRandomNumber } from './index';
import { ERROR_MESSAGE, LOTTO } from '../constants';

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

export function isValidLottoNumber(
  number,
  range = {
    min: LOTTO.MIN_WINNING_NUMBER_RANGE,
    max: LOTTO.MAX_WINNING_NUMBER_RANGE,
  }
) {
  return Number.isInteger(number) && number >= range.min && number <= range.max;
}

export function isValidLottoNumberArray(
  numbers,
  length = LOTTO.WINNING_NUMBER_LENGTH
) {
  return (
    Array.isArray(numbers) &&
    new Set(numbers).size === length &&
    numbers.every((number) => isValidLottoNumber(number))
  );
}

export function convertLottoStringToLottoArray(input) {
  const lottoNumbers = input
    .replace(/\s/g, '')
    .split(',')
    .map((number) => Number(number));

  if (!isValidLottoNumberArray(lottoNumbers)) {
    throw TypeError(ERROR_MESSAGE.INVALID_LOTTO_FORMAT);
  }

  return lottoNumbers;
}
