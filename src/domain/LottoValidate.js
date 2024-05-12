import { LOTTO, MESSAGE } from "../constant";
import {
  isEqualLength,
  isInRange,
  isNaturalNumber,
  hasDuplicateNumbers,
} from "../utils/validation";

export const validateNumberCount = (numbers) => {
  if (!isEqualLength(numbers, LOTTO.NUMBER_COUNT)) {
    throw new Error(MESSAGE.ERROR.NUMBER_COUNT);
  }
};

export const validateNumberInRange = (num) => {
  if (!isInRange(num, LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER)) {
    throw new Error(MESSAGE.ERROR.NUMBER_RANGE);
  }
};

export const validateNaturalNumber = (num) => {
  if (!isNaturalNumber(num)) {
    throw new Error(MESSAGE.ERROR.LOTTO_NUMBER_SHOULD_BE_NATURAL);
  }
};

export const validateUniqueNumber = (numbers) => {
  if (hasDuplicateNumbers(numbers)) {
    throw new Error(MESSAGE.ERROR.UNIQUE_NUMBER);
  }
};

export const validatePrice = (price) => {
  if (!isNaturalNumber(price)) {
    throw new Error(MESSAGE.ERROR.MONEY_SHOULD_BE_NATURAL);
  }
};
