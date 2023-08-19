import LottoRules from "./LottoRules";

export default class LottoTicket {
  #rule;
  #numbers = new Set([]);

  constructor(rule) {
    this.#rule = rule instanceof LottoRules ? rule : new LottoRules();
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
