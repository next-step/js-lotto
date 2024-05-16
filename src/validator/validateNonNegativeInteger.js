import { OUTPUT_MESSAGE } from "../constants/message";

export const validateNonNegativeInteger = (number) => {
  if (isNaN(number)) {
    throw new Error(OUTPUT_MESSAGE.NAN_ERROR);
  }

  if (number < 1) {
    throw new Error(OUTPUT_MESSAGE.NEGETIVE_NUM_ERROR);
  }

  if (!Number.isInteger(number)) {
    throw new Error(OUTPUT_MESSAGE.INTEGER_ERROR);
  }
};
