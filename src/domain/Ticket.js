import { RULES } from "../util/rule.js";

class Ticket {
  #numbers;
  #price;

  constructor({ numbers: numbers }) {
    const isValidNumbers = this.#checkNumbers(numbers);
    const isValidNumbersLength = this.#checkNumbersLength(numbers);
    console.log(isValidNumbers, isValidNumbersLength, numbers);
    if (isValidNumbers === false || isValidNumbersLength === false)
      throw new Error("잘못된 입력입니다");
    this.#setNumbers(numbers);
    this.#setPrice();
  }

  get getNumbers() {
    return this.#numbers;
  }

  #checkNumbers(numbers) {
    return numbers.every(
      (number) =>
        Number.isInteger(number) &&
        number >= RULES.MIN_TICKET_NUMBER &&
        number <= RULES.MAX_TICKET_NUMBER,
    );
  }
  #checkNumbersLength(numbers) {
    return numbers.length == RULES.TICKET_LENGTH;
  }
  #setNumbers(numbers) {
    this.#numbers = numbers;
  }
  #setPrice() {
    this.#price = RULES.TICKET_PRICE;
  }

  get getPrice() {
    return this.#price;
  }
}

export default Ticket;
