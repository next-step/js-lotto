import { LottoNumber } from './index.js';

import { MIN_NUMBER, MAX_NUMBER, NUMBER_AMOUNT } from '../constants/index.js';

export class LottoTicket {
  numbers = [];

  constructor() {
    this.randomNumbers();
  }

  randomNumbers() {
    for (let i = 0; i < NUMBER_AMOUNT; i++) {
      const number = Math.trunc(
        Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER
      );

      this.numbers.push(new LottoNumber(number));
    }
  }
}
