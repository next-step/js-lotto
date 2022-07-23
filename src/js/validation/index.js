import { PRICE_UNIT } from '../constants/index.js';

export const isPriceUnitCheck = (input) => {
  const price = input.value;
  return price % PRICE_UNIT === 0;
};
