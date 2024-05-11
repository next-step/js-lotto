import { LOTTO } from "../constants/lotto";
import { OUTPUT_MESSAGE } from "../constants/message";

export const isArrLengthValidator = (arr) => {
  if (arr.length !== LOTTO.NUMBERS_COUNT) {
    throw new Error(OUTPUT_MESSAGE.WINNING_NUMBERS_LENGTH_ERROR);
  }
};
