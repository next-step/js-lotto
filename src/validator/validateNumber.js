import { LOTTO } from "../constants/lotto";
import { OUTPUT_MESSAGE } from "../constants/message";

export const validateNumber = {
  nan: (number) => {
    if (isNaN(number)) {
      throw new Error(OUTPUT_MESSAGE.NAN_ERROR);
    }
  },

  negative: (number) => {
    if (number < 1) {
      throw new Error(OUTPUT_MESSAGE.NEGETIVE_NUM_ERROR);
    }
  },

  integer: (number) => {
    if (!Number.isInteger(number)) {
      throw new Error(OUTPUT_MESSAGE.INTEGER_ERROR);
    }
  },

  max: (number) => {
    if (number > LOTTO.MAX_NUMBER) {
      throw new Error(OUTPUT_MESSAGE.LIMIT_NUM_ERROR);
    }
  },
};
