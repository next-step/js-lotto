import ERROR_TICKET from "./error.js";
import { TICKET_RULES } from "./rule.js";
import RULES from "../../util/rule.js";

class Ticket {
  #numbers;

  #price;

  constructor({ numbers }) {
    this.#setNumbers({
      numbers,
      predicate: TICKET_RULES.numbersRule,
      errorMessage: ERROR_TICKET.WRONG_TICKET_INPUT,
    });
    this.#setPrice();
  }

  get getNumbers() {
    return [...this.#numbers];
  }

  #setNumbers({ predicate, errorMessage, numbers }) {
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
