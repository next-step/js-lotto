import { PRICE_UNIT } from '../constants/index.js';

export const getLottoAvailableQuantity = (price) => {
  return Math.floor(price / PRICE_UNIT);
};
