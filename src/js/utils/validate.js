import { ERROR_MESSAGES, MAX_PRICE, UNIT_OF_PRICE } from './constant.js';

export const checkUnitOfPrice = inputPrice => {
  // 타입에관한것도 ㄱㄱ
  try {
    if (inputPrice < 0) {
      throw Error(ERROR_MESSAGES.CANNOT_NEGATIVE_PRICE);
    }
    if (inputPrice > MAX_PRICE) {
      throw Error(ERROR_MESSAGES.EXCEED_PRICE);
    }
    if (inputPrice % UNIT_OF_PRICE > 0 || inputPrice === 0) {
      throw Error(ERROR_MESSAGES.INCORRECT_UNIT_OF_PRICE);
    }
    if (inputPrice) {
      if (typeof inputPrice !== 'number') {
        throw Error(ERROR_MESSAGES.INCORRECT_TYPE_OF_PRICE);
      }
    }
  } catch (error) {
    alert(error.message);
    return false;
  }
  return true;
};
