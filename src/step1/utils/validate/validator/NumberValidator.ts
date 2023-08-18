import { ERROR_MESSAGE } from '../../../constants/message';
import { NUMBER_TERMS } from '../../../constants/number';

const NumberValidator = {
  validateZero(value: number) {
    if (value === NUMBER_TERMS.ZERO) {
      throw new TypeError(ERROR_MESSAGE.INVALID_NUMBER(value));
    }
  },
};

export default NumberValidator;
