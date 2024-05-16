import { OUTPUT_MESSAGE } from "../constants/message";

export const validateArrDuplicate = (array) => {
  const validator = new Set(array);

  if (validator.size !== array.length) {
    throw new Error(OUTPUT_MESSAGE.DUPLICATE_NUMBER_ERROR);
  }
};
