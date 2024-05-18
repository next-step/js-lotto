import { validateNumbers } from "../utils/validator/validateNumbers";

export class Lotto {
  static PRICE = 1000;
  static LEN = 6;
  #numbers;

  constructor(numbers) {
    validateNumbers(numbers);
    this.#numbers = numbers;
  }

  getMatchCount(winningNumber) {
    return this.#numbers.filter((num) => winningNumber.includes(num)).length;
  }

  get numbers() {
    return this.#numbers;
  }
}
