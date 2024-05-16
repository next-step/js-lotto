import { LOTTO } from "../constants/lotto";
import { OUTPUT_MESSAGE } from "../constants/message";

export const validateArrLimitNum = (arr) => {
  const validator = arr.some((num) => num > LOTTO.MAX_NUMBER || num < 1);

  if (validator) {
    throw new Error(OUTPUT_MESSAGE.LIMIT_NUM_ERROR);
  }
};
