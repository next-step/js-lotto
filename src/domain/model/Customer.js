import { LOTTO_WINNIG_PRIZE, WINNING_CASE } from '../constants/index.js';

export class Customer {
  amount = 0;
  constructor(money) {
    this.money = money;
    this.results = Array.from({ length: WINNING_CASE }, () => 0);
  }

  countResult(count) {
    if (count < 3) {
      return;
    }

    this.results[count - 3] += 1;
    this.amount += LOTTO_WINNIG_PRIZE[count - 3];
  }
}
