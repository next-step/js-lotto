import { ERROR_MESSAGES } from './constant.js';

export const checkUnitOfPrice = inputPrice => {
  if (inputPrice < 0) {
    throw Error('로또 구입 금액은 양수여야 합니다.');
  }
  if (inputPrice > 100000) {
    throw Error('로또 구입 금액은 100000을 넘지 않아야 합니다..');
  }
  if (inputPrice % 1000 > 0) {
    throw Error(ERROR_MESSAGES.INCORRECT_UNIT_OF_PRICE);
  }
  return true;
};
