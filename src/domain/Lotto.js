import { ERROR_CODES } from "../constants/error";

export class Lotto {
  static PRICE = 1000;
  #numbers;

  constructor(numbers) {
    this.validateNumbers(numbers);
    this.#numbers = numbers;
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

  getMatchCount(winningNumber) {
    let cnt = 0;
    this.#numbers.forEach((num) => {
      if (winningNumber.includes(num)) {
        cnt++;
      }
    });
    return cnt;
  }

  get numbers() {
    return this.#numbers;
  }
}
