import { OUTPUT_MESSAGE } from "../constants/message";

export const validateArrContainNum = (array, number) => {
  if (array.includes(number)) {
    throw new Error(OUTPUT_MESSAGE.CONTAIN_ERROR);
  }
};
