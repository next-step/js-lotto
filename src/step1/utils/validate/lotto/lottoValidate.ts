import { LOTTO_TERMS } from '../../../constants/lotto';

export const isLessThenPricePerLotto = (value: number) => value < LOTTO_TERMS.PRICE_PER_LOTTO;

export const isDuplicateLottoNumbers = (lottoNumbers: number[]) => new Set(lottoNumbers).size !== lottoNumbers.length;

export const isDuplicateLottoNumber = (lottoNumbers: number[], targetNumber: number) =>
  lottoNumbers.includes(targetNumber);

export const isDefaultLottoCount = (lottoNumbers: number[]) =>
  lottoNumbers.length === LOTTO_TERMS.DEFAULT_LIMIT_LOTTO_COUNT;

export const isValidLottoNumberRange = (lottoNumber: number) =>
  lottoNumber >= LOTTO_TERMS.MIN_LOTTO_NUMBER && lottoNumber <= LOTTO_TERMS.MAX_LOTTO_NUMBER;

export const isValidLottoNumbersRange = (lottoNumbers: number[]) =>
  lottoNumbers.every((lottoNumber) => isValidLottoNumberRange(lottoNumber));

export const isValidWinningCountRange = (winningCount: number) =>
  winningCount >= LOTTO_TERMS.MIN_WINNING_COUNT && winningCount <= LOTTO_TERMS.MAX_WINNING_COUNT;
