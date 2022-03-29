export default class WinningNumber {
  #numbers;

  #MIN_NUMBER = 1;
  #MAX_NUMBER = 45;

  constructor() {
    this.#numbers = new Set();
    this.bonusNumber = null;
  }

  #isValidNumber = (number) =>
    number >= this.#MIN_NUMBER &&
    number <= this.#MAX_NUMBER;

  addNumber = (number) => {
    this.#numbers.add(number);
  };

  get numbers() {
    return Array.from(this.#numbers);
  }

  get bonusNumber() {
    return this.bonusNumber;
  }

  set bonusNumber(number) {
    this.bonusNumber = number;
  }

  isValid = () => {
    if (this.#numbers.size !== 6) {
      return false;
    }
    if (this.bonusNumber === null) {
      return false;
    }
    if (!([this.bonusNumber, ...this.numbers].every(this.#isValidNumber))) {
      return false;
    }

    return true;
  };
}
