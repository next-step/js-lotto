export default class WinningNumber {
  #numbers;

  #bonusNumber;

  constructor() {
    this.#numbers = new Set();
    this.#bonusNumber = null;
  }

  #isValidNumber = (number) =>
    number >= 1 &&
    number <= 45 &&
    !this.#numbers.has(number) &&
    this.#bonusNumber !== number;

  addNumber = (number) => {
    if (this.#isValidNumber(number)) {
      throw new Error(`이미 존재하거나 입력할 수 없는 번호입니다.`);
    }
    this.#numbers.add(number);
  };

  get numbers() {
    return Array.from(this.#numbers);
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  set bonusNumber(number) {
    if (this.#isValidNumber(number)) {
      throw new Error(`이미 존재하거나 입력할 수 없는 번호입니다.`);
    }
    this.#bonusNumber = number;
  }
}
