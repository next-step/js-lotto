import { OUTPUT_MESSAGE } from "../constants/message";

export const isNumberValidator = (number) => {
  if (Number.isNaN(number)) {
    throw new Error(OUTPUT_MESSAGE.NAN_ERROR);
  }
};
