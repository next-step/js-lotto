import {
  WARNING_WHEN_NOT_IN_1000_UNITS,
  WARNING_WHEN_NOT_IN_CORRECT_RANGE,
} from '../../utils/consts.js';

const priceError = {
  lottoPriceRangeError() {
    return new Error(WARNING_WHEN_NOT_IN_CORRECT_RANGE);
  },
  lottoPriceUnitError() {
    return new Error(WARNING_WHEN_NOT_IN_1000_UNITS);
  },
};

export default priceError;
