import {
  validateNumberCount,
  validateNumberInRange,
  validateNaturalNumber,
  validateUniqueNumber,
} from "./LottoValidate";

export default class Lotto {
  numbers = [];

  constructor(numbers) {
    this.#validateNumbers(numbers);
    this.numbers = numbers;
  }

  get numbers() {
    return this.numbers;
  }

  #validateNumbers(numbers) {
    validateNumberCount(numbers);

    numbers.forEach((num) => {
      validateNumberInRange(num);
      validateNaturalNumber(num);
    });

    validateUniqueNumber(numbers);
  }
}
