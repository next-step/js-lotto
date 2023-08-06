import {
  DEFAULT_LIMIT_LOTTO_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from '../../src/step1/constants/lotto.js';

export const isValidRange = (lottoNumber) =>
  lottoNumber >= MIN_LOTTO_NUMBER && lottoNumber <= MAX_LOTTO_NUMBER;

export const isAllLottoValidRange = (lotto) =>
  lotto.every((lottoNumber) => isValidRange(lottoNumber));

export const isSixNumberInLotto = (lotto) =>
  lotto.length === DEFAULT_LIMIT_LOTTO_COUNT;
