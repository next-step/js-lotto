import LottoTicketRules from "./LottoTicketRules.js";
import { getRandomIntegerBetweenMinMax } from "../utils/numberFunc.js";

export default class LottoTicket {
  #rule;
  #numbers = new Set([]);

  constructor(ticketRules = new LottoTicketRules()) {
    if (!(ticketRules instanceof LottoTicketRules)) {
      throw new Error("로또 규칙이 올바르지 않습니다.");
    }

    this.#rule = ticketRules;
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
