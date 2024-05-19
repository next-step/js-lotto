import { ERROR_CODES } from "../../constants/error";
import { Lotto } from "../../domain/Lotto";

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
  return (
    !numbers.length || numbers.length < Lotto.LEN || numbers.length > Lotto.LEN
  );
}

function isValidNum(numbers) {
  return numbers.some((num) => isNaN(num) || num < 1 || num > 45);
}

function isValidDuplicatedNum(numbers) {
  return new Set(numbers).size !== Lotto.LEN;
}
