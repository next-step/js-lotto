import { ERROR_TICKET } from "../util/error.js";
import { RULES, TICKET_RULES } from "../util/rule.js";

class Ticket {
  #numbers;
  #price;

  constructor({ numbers: numbers }) {
    this.#setNumbers(
      numbers,
      TICKET_RULES.numbersRule,
      ERROR_TICKET.WRONG_TICKET_INPUT,
    );
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
