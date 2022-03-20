import { ERROR_MESSAGE, AMOUNT_UNIT } from '../constants.js';
import { isEmpty } from './valid.js';

export const validCount = amount => {
  const count = Number(amount / AMOUNT_UNIT);
  if (isEmpty(amount) || isNaN(count)) throw new Error(ERROR_MESSAGE.REQUIRED_DIGIT);
  if (amount < AMOUNT_UNIT) throw new Error(ERROR_MESSAGE.MUST_MORE_THAN);
  if (!Number.isInteger(count)) throw new Error(ERROR_MESSAGE.MUST_REQUIRED_AMOUNT_UNIT);
  return count;
};
