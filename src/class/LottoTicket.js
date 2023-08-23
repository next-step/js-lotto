import LottoTicketRules from "./LottoTicketRules.js";

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

  generateRandomNumber() {
    return (
      Math.floor(Math.random() * (this.#rule.max - this.#rule.min + 1)) +
      this.#rule.min
    );
  }

  addNumber(number) {
    this.#numbers.add(number);
  }

  initializeTicket() {
    while (this.#numbers.size < this.rule.length) {
      this.addNumber(this.generateRandomNumber());
    }
  }
}
