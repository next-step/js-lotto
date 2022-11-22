import { ERROR_MESSAGE, LOTTO_CONSTRAINT } from './constants/index.js';

const isNotPriceUnit = (priceInput) => priceInput % LOTTO_CONSTRAINT.PRICE_UNIT !== 0;

const isNotOverMinPrice = (priceInput) => priceInput < LOTTO_CONSTRAINT.PRICE_UNIT;

export const validatePriceInput = (priceInput) => {
  if (isNotOverMinPrice(priceInput)) {
    throw new Error(ERROR_MESSAGE.INVALID_OVER_MIN_PRICE);
  }

  if (isNotPriceUnit(priceInput)) {
    throw new Error(ERROR_MESSAGE.INVALID_PRICE_UNIT);
  }
};
