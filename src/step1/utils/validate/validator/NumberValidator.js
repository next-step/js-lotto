import { ERROR_MESSAGE } from '../../../constants/message.js';
import { NUMBER_TERMS } from '../../../constants/number.js';

const NumberValidator = {
  validateZero(value) {
    if (value === NUMBER_TERMS.ZERO) {
      throw new TypeError(ERROR_MESSAGE.INVALID_NUMBER(value));
    }
  },
};

export default NumberValidator;
