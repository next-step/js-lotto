import { PRICE_UNIT, LOTTO_CONSTRAINT } from '../constants/index.js';

export const isPriceUnitCorrect = (priceInput) => priceInput % PRICE_UNIT === 0;

export const isOverMinPrice = (priceInput) => priceInput >= PRICE_UNIT;

export const isEmpty = (number) => Number.isNaN(number);

export const isWithinLottoNumberRange = (number) => {
  return (
    number >= LOTTO_CONSTRAINT.MIN_IN_LOTTO_NUMBER && number <= LOTTO_CONSTRAINT.MAX_IN_LOTTO_NUMBER
  );
};
