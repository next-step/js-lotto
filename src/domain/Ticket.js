import {
  MIN_TICKET_NUMBER,
  MAX_TICKET_NUMBER,
  TICKET_LENGTH,
} from "../util/rule.js";

class Ticket {
  #numbers;

  constructor({ numbers: numbers }) {
    const isValidNumbers = this.#checkNumbers(numbers);
    const isValidNumbersLength = this.#checkNumbersLength(numbers);
    if (isValidNumbers === false || isValidNumbersLength == false)
      throw new Error("에러야");
    this.#setNumbers(numbers);
  }

  get getNumbers() {
    return this.#numbers;
  }

  #checkNumbers(numbers) {
    return numbers.every(
      (number) =>
        Number.isInteger(number) &&
        number >= MIN_TICKET_NUMBER &&
        number <= MAX_TICKET_NUMBER,
    );
  }
  #checkNumbersLength(numbers) {
    return numbers.length == TICKET_LENGTH;
  }
  #setNumbers(numbers) {
    this.#numbers = numbers;
  }
}

export default Ticket;
