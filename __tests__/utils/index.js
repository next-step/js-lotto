import {
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from '../../src/step1/constants/lotto.js';

export const isAllLottoValidRange = (lotto) =>
  lotto.every((lottoNumber) => isValidRange(lottoNumber));

export const isValidRange = (lottoNumber) =>
  lottoNumber >= MIN_LOTTO_NUMBER && lottoNumber <= MAX_LOTTO_NUMBER;
