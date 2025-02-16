import {
  hasDuplicateNumber,
  isNumber,
  isPositiveInteger,
  shuffle,
} from '../../utils/index.js';
import { LOTTO } from './constants.js';

export const validateLottoNumberRange = (value) =>
  isNumber(value) &&
  isPositiveInteger(value) &&
  value >= LOTTO.RANGE.min &&
  value <= LOTTO.RANGE.max;

export const validateBonusNumber = (bonusNumber, jackpotNumbers) => {
  const isLottoNumberRange = validateLottoNumberRange(bonusNumber);

  return (
    isNumber(bonusNumber) &&
    isPositiveInteger(bonusNumber) &&
    isLottoNumberRange &&
    !jackpotNumbers.includes(bonusNumber)
  );
};

export const getLotto = (stocks) => {
  if (
    !Array.isArray(stocks) ||
    stocks.length < LOTTO.SIZE ||
    hasDuplicateNumber(stocks) ||
    !stocks.every(validateLottoNumberRange)
  ) {
    throw new Error('보유한 로또 숫자들 중 허용되지 않는 숫자가 있습니다.');
  }

  return shuffle(Array.from(stocks)).slice(0, LOTTO.SIZE);
};
