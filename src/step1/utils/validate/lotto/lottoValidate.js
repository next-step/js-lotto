import {
  DEFAULT_LIMIT_LOTTO_COUNT,
  MAX_LOTTO_NUMBER,
  MAX_WINNING_COUNT,
  MIN_LOTTO_NUMBER,
  MIN_WINNING_COUNT,
  PRICE_PER_LOTTO,
} from '../../../constants/lotto.js';

export const isLessThenPricePerLotto = (value) => value < PRICE_PER_LOTTO;

export const isDuplicateLottoNumbers = (lottoNumbers) => new Set(lottoNumbers).size !== lottoNumbers.length;

export const isDuplicateLottoNumber = (lottoNumbers, targetNumber) => lottoNumbers.includes(targetNumber);

export const isDefaultLottoCount = (lottoNumbers) => lottoNumbers.length === DEFAULT_LIMIT_LOTTO_COUNT;

export const isValidLottoNumbersRange = (lottoNumbers) =>
  !lottoNumbers.some((lottoNumber) => lottoNumber < MIN_LOTTO_NUMBER || lottoNumber > MAX_LOTTO_NUMBER);

export const isValidLottoNumberRange = (lottoNumber) =>
  lottoNumber >= MIN_LOTTO_NUMBER && lottoNumber <= MAX_LOTTO_NUMBER;

export const isValidWinningCountRange = (winningCount) =>
  winningCount >= MIN_WINNING_COUNT && winningCount <= MAX_WINNING_COUNT;
