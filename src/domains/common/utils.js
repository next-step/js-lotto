import {
  hasDuplicateNumber,
  isNumber,
  isPositiveInteger,
  shuffle,
} from '../../utils/index.js';
import { LOTTO } from './constants.js';

export const isValidLottoNumberRange = (value) =>
  isNumber(value) &&
  isPositiveInteger(value) &&
  value >= LOTTO.RANGE.min &&
  value <= LOTTO.RANGE.max;

export const isValidBonusNumber = (bonusNumber, jackpotNumbers) => {
  return (
    isNumber(bonusNumber) &&
    isPositiveInteger(bonusNumber) &&
    isValidLottoNumberRange(bonusNumber) &&
    !jackpotNumbers.includes(bonusNumber)
  );
};

export const getLotto = (stocks) => {
  if (
    !Array.isArray(stocks) ||
    stocks.length < LOTTO.SIZE ||
    hasDuplicateNumber(stocks) ||
    !stocks.every(isValidLottoNumberRange)
  ) {
    throw new Error('보유한 로또 숫자들 중 허용되지 않는 숫자가 있습니다.');
  }

  return shuffle(Array.from(stocks)).slice(0, LOTTO.SIZE);
};
