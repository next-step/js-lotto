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
