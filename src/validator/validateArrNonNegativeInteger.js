import { OUTPUT_MESSAGE } from "../constants/message";

export const validateArrNonNegativeInteger = (array) => {
  const nanValidator = array.some((number) => isNaN(number));
  const nonNegativeValidator = array.some((number) => number < 0);
  const integerValidator = array.some((number) => !Number.isInteger(number));

  if (nanValidator) {
    throw new Error(OUTPUT_MESSAGE.NAN_ERROR);
  }

  if (nonNegativeValidator) {
    throw new Error(OUTPUT_MESSAGE.NEGETIVE_NUM_ERROR);
  }

  if (integerValidator) {
    throw new Error(OUTPUT_MESSAGE.INTEGER_ERROR);
  }
};
