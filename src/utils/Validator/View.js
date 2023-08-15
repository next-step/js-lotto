import { isPositiveNumber } from '.';
import { MESSAGE, STRING } from '../../constants';

/* View */
export const View = {
  readUserInput(value) {
    if (value === STRING.EMPTY) throw new Error(MESSAGE.ERROR.EMPTY_STRING);
  },

  readPurchaseAmount(value) {
    if (!isPositiveNumber(value))
      throw new Error(MESSAGE.ERROR.IS_NOT_POSITIVE_NUMBER);
  },
};
