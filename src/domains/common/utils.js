import { isNumber, isPositiveInteger } from '../../utils';
import { LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from './constants';

const isLottoNumberRange = (value) =>
  value >= LOTTO_MIN_NUMBER && value <= LOTTO_MAX_NUMBER;

export const getRandomLottoNumber = (manualNumber) => {
  const targetNumber =
    manualNumber ??
    Math.floor(Math.random() * LOTTO_MAX_NUMBER) + LOTTO_MIN_NUMBER;

  if (
    !isNumber(targetNumber) ||
    !isPositiveInteger(targetNumber) ||
    !isLottoNumberRange(targetNumber)
  ) {
    throw new Error('로또 번호를 생성하면서 문제가 생겼습니다.');
  }

  return targetNumber;
};
