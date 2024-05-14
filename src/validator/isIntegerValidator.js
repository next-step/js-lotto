import { OUTPUT_MESSAGE } from "../constants/message";

export const isIntegerValidator = (number) => {
  if (Number.isNaN(number)) {
    throw new Error(OUTPUT_MESSAGE.NAN_ERROR);
  }

  if (!Number.isInteger(number)) {
    throw new Error(OUTPUT_MESSAGE.INTEGER_ERROR);
  }
};
