import LottoTicketRules from "./LottoTicketRules.js";
import { getRandomIntegerBetweenMinMax } from "../utils/numberFunc.js";

export default class LottoTicket {
  #rule;
  #numbers = new Set([]);

  constructor(ticketRules) {
    this.#rule =
      ticketRules instanceof LottoTicketRules
        ? ticketRules
        : new LottoTicketRules();
    this.initializeTicket();
  }

  get rule() {
    return this.#rule;
  }

  get numbers() {
    return [...this.#numbers];
  }

  addNumber(number) {
    this.#numbers.add(number);
  }

  initializeTicket() {
    while (this.#numbers.size < this.rule.length) {
      this.addNumber(
        getRandomIntegerBetweenMinMax(this.#rule.min, this.#rule.max),
      );
    }
  }
}
