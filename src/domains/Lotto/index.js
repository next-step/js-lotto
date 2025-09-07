import {
  MAX_LOTTO_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  ERROR_MESSAGES,
} from "./constants/index.js";

export class Lotto {
  #numbers;

  constructor(numbers) {
    if (numbers.length !== MAX_LOTTO_NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGES.INVALID_COUNT);
    }

    if (new Set(numbers).size !== MAX_LOTTO_NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGES.DUPLICATE_NUMBERS);
    }

    if (
      numbers.some(
        (number) => number < MIN_LOTTO_NUMBER || number > MAX_LOTTO_NUMBER
      )
    ) {
      throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
    }

    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }
}
