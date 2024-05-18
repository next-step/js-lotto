import { ERROR_CODES } from "../../constants/error";

export function validateNumbers(numbers) {
  if (isValidLen(numbers)) {
    throw new Error(ERROR_CODES.ERROR_INVALID_LENGTH);
  }

  if (isValidNum(numbers)) {
    throw new Error(ERROR_CODES.ERROR_INVALID_NUMBER);
  }

  if (isValidDuplicatedNum(numbers)) {
    throw new Error(ERROR_CODES.ERROR_DUPLICATE_NUMBER);
  }
}

function isValidLen(numbers) {
  return numbers.length !== 6;
}

function isValidNum(numbers) {
  return numbers.some((num) => isNaN(num) || num < 1 || num > 45);
}

function isValidDuplicatedNum(numbers) {
  return new Set(numbers).size !== 6;
}
