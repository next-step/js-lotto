import { LOTTO_LENGTH, LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from './constants.js';

export function validateLottoLength(lotto) {
  return lotto.length === LOTTO_LENGTH;
}

export function validateLottoOutOfRangeNumberWithBonus(lotto, bonus) {
  return (
    [...lotto, bonus].filter(number => number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER)
      .length === 0
  );
}

export function validateLottoHaveDuplicateNumberWithBonus(lotto, bonus) {
  return new Set([...lotto, bonus]).size === LOTTO_LENGTH + 1;
}
