import { LOTTO } from "../constants/lotto";
import { OUTPUT_MESSAGE } from "../constants/message";

export const validateNumber = {
  inRange: (number) => {
    if (isNaN(number)) {
      throw new Error(OUTPUT_MESSAGE.NAN_ERROR);
    }

    if (number < 1) {
      throw new Error(OUTPUT_MESSAGE.NEGETIVE_NUM_ERROR);
    }

    if (!Number.isInteger(number)) {
      throw new Error(OUTPUT_MESSAGE.INTEGER_ERROR);
    }

    if (number > LOTTO.MAX_NUMBER) {
      throw new Error(OUTPUT_MESSAGE.LIMIT_NUM_ERROR);
    }
  },
};
