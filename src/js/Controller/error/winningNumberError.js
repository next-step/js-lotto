import {
  WARNING_WHEN_DUPLICATE,
  WARNING_WHEN_NOT_IN_ONE_FOURTYFIVE,
} from '../../utils/consts.js';

const winningNumberError = {
  winningNumberRangeError() {
    return new Error(WARNING_WHEN_NOT_IN_ONE_FOURTYFIVE);
  },

  winningNumberDuplicateError() {
    return new Error(WARNING_WHEN_DUPLICATE);
  },
};

export default winningNumberError;
