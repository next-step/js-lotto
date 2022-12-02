import { ERROR_MESSAGE } from './constants/index.js';
import { isPriceUnitCorrect, isOverMinPrice } from './utils/validation.js';

export const validatePriceInput = (priceInput) => {
  if (!isOverMinPrice(priceInput)) {
    throw new Error(ERROR_MESSAGE.INVALID_OVER_MIN_PRICE);
  }

  if (!isPriceUnitCorrect(priceInput)) {
    throw new Error(ERROR_MESSAGE.INVALID_PRICE_UNIT);
  }
};
