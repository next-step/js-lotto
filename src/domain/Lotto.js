import { LOTTO } from "../constant";
import {
  isInRange,
  isNaturalNumber,
  isEqualLength,
  hasDuplicateNumbers,
} from "../utils/validation";

export default class Lotto {
  numbers = [];

  constructor(numbers) {
    this.validateNumbers(numbers);
    this.numbers = numbers;
  }

  get numbers() {
    return this.numbers;
  }

  validateNumbers(numbers) {
    this.#validateNumberCount(numbers);

    numbers.forEach((num) => {
      this.#validateNumberInRange(num);
      this.#validateNaturalNumber(num);
    });

    this.#validateUniqueNumber(numbers);
  }

  #validateNumberCount(numbers) {
    if (!isEqualLength(numbers, LOTTO.NUMBER_COUNT)) {
      throw new Error("로또 번호는 6개여야 합니다.");
    }
  }

  #validateNumberInRange(num) {
    if (!isInRange(num, LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER)) {
      throw new Error(
        `모든 로또의 번호는 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER}사이의 수 입니다.`
      );
    }
  }

  #validateNaturalNumber(num) {
    if (!isNaturalNumber(num)) {
      throw new Error("모든 로또의 번호는 자연수여야 합니다.");
    }
  }

  #validateUniqueNumber(numbers) {
    if (hasDuplicateNumbers(numbers)) {
      throw new Error("중복된 번호가 있습니다.");
    }
  }
}
