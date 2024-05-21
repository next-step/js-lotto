import { ERROR_CODES } from "../../constants/error";

export function validateNumber(number) {
  if (isNaN(number)) {
    throw new Error(ERROR_CODES.ERROR_NOT_A_NUMBER);
  }
}
