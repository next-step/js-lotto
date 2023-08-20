import { ERROR_MESSAGE } from '@step1/constants/message';
import { NUMBER_TERMS } from '@step1/constants/number';

const NumberValidator = {
  validateZero(value: number) {
    if (value === NUMBER_TERMS.ZERO) {
      throw new TypeError(ERROR_MESSAGE.INVALID_NUMBER(value));
    }
  },
};

export default NumberValidator;
