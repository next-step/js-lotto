import { MIN_NUMBER, MAX_NUMBER, NUMBER_AMOUNT } from '../constants/index.js';

export class LottoTicket {
  numbers = new Map();

  constructor() {
    this.issueNumbers();
  }

  issueNumbers() {
    while (this.numbers.size < NUMBER_AMOUNT) {
      const number = this.randomNumber();

      if (this.numbers.has(number)) continue;
      
      this.numbers.set(number, true);
    }
  }

  randomNumber() {
    return Math.trunc(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);
  }

  getNumbers() {
    return Array.from(this.numbers).map(([number]) => number);
  }
}
