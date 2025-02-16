import {
  hasDuplicateNumber,
  isNumber,
  isPositiveInteger,
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

export const getRandomLottoNumber = (availableNumbers) => {
  if (!Array.isArray(availableNumbers) || !availableNumbers.length > 0) {
    throw new Error('로또 번호를 생성하면서 문제가 생겼습니다.');
  }

  const selectedIndex = Math.floor(Math.random() * availableNumbers.length);
  const selectedNumber = availableNumbers[selectedIndex];
  const isLottoNumberRange = validateLottoNumberRange(selectedNumber);

  if (
    !isNumber(selectedNumber) ||
    !isPositiveInteger(selectedNumber) ||
    !isLottoNumberRange
  ) {
    throw new Error('로또 번호를 생성하면서 문제가 생겼습니다.');
  }

  return selectedNumber;
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

  return Array.from(stocks)
    .sort(() => Math.random() - 1)
    .slice(0, LOTTO.SIZE);
};
