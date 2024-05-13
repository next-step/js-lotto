import { ERROR_CODES } from "../constants/error";

export class Lotto {
  static PRICE = 1000;

  constructor(numbers) {
    this.validateNumbers(numbers);
  }

  validateNumbers(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR_CODES.ERROR_INVALID_LENGTH);
    }

    if (numbers.some((num) => isNaN(num) || num < 1 || num > 45)) {
      throw new Error(ERROR_CODES.ERROR_INVALID_NUMBER);
    }

    if (new Set(numbers).size !== 6) {
      throw new Error(ERROR_CODES.ERROR_DUPLICATE_NUMBER);
    }
  }
}
