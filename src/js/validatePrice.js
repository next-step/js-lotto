import { ERROR_MESSAGE, PRICE_UNIT } from './constants/index.js';

const isPriceUnitCorrect = (priceInput) => priceInput % PRICE_UNIT === 0;

const isOverMinPrice = (priceInput) => priceInput >= PRICE_UNIT;

export const validatePriceInput = (priceInput) => {
  if (!isOverMinPrice(priceInput)) {
    throw new Error(ERROR_MESSAGE.INVALID_OVER_MIN_PRICE);
  }

  if (!isPriceUnitCorrect(priceInput)) {
    throw new Error(ERROR_MESSAGE.INVALID_PRICE_UNIT);
  }
};
