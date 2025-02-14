import { RULES, TICKET_RULES } from "../util/rule.js";

class Ticket {
  #numbers;
  #price;

  constructor({ numbers: numbers }) {
    this.#setNumbers(numbers, TICKET_RULES.numbersRule, "잘못된 입력입니다");
    this.#setPrice();
  }

  get getNumbers() {
    return this.#numbers;
  }

  #setNumbers(numbers, predicate, errorMessage) {
    if (predicate(numbers) === false) {
      throw new Error(errorMessage);
    }
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
