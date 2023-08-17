import { LOTTO_TERMS } from '../../../constants/lotto.js';

export const isLessThenPricePerLotto = (value) => value < LOTTO_TERMS.PRICE_PER_LOTTO;

export const isDuplicateLottoNumbers = (lottoNumbers) => new Set(lottoNumbers).size !== lottoNumbers.length;

export const isDuplicateLottoNumber = (lottoNumbers, targetNumber) => lottoNumbers.includes(targetNumber);

export const isDefaultLottoCount = (lottoNumbers) => lottoNumbers.length === LOTTO_TERMS.DEFAULT_LIMIT_LOTTO_COUNT;

export const isValidLottoNumberRange = (lottoNumber) =>
  lottoNumber >= LOTTO_TERMS.MIN_LOTTO_NUMBER && lottoNumber <= LOTTO_TERMS.MAX_LOTTO_NUMBER;

export const isValidLottoNumbersRange = (lottoNumbers) =>
  lottoNumbers.every((lottoNumber) => isValidLottoNumberRange(lottoNumber));

export const isValidWinningCountRange = (winningCount) =>
  winningCount >= LOTTO_TERMS.MIN_WINNING_COUNT && winningCount <= LOTTO_TERMS.MAX_WINNING_COUNT;
