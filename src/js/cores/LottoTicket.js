import { MIN_NUMBER, MAX_NUMBER, NUMBERS_COUNT } from '../constants/index.js';

export class LottoTicket {
  numbers = new Set();

  constructor() {
    this.issueNumbers();
  }

  issueNumbers() {
    while (this.numbers.size < NUMBERS_COUNT) {
      const number = this.randomNumber();

      if (!this.numbers.has(number)) this.numbers.add(number);
    }
  }

  randomNumber() {
    return Math.trunc(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);
  }

  getNumbers() {
    return Array.from(this.numbers.keys());
  }
}
