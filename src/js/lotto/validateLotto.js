import { LOTTO_LENGTH, LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from '../constants/lotto.js';

export function validateLottoLength(lotto) {
  return lotto.length !== LOTTO_LENGTH;
}

export function validateLottoOutOfRangeNumber(lotto) {
  return lotto.filter(number => number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER).length > 0;
}

export function validateLottohaveDuplicateNumber(lotto) {
  return new Set(lotto).size !== LOTTO_LENGTH;
}
