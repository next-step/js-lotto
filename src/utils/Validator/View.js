import { isPositiveNumber } from '.';

/* View */
export const View = {
  readUserInput(value) {
    if (value === '') throw new Error('빈 공백은 입력이 불가능합니다.');
  },

  readPurchaseAmount(value) {
    if (!isPositiveNumber(value))
      throw new Error('0 이상의 정수만 입력이 가능합니다.');
  },
};
