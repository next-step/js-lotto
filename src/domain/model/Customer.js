import { LOTTO_WINNIG_PRIZE } from '../constants/index.js';

export class Customer {
  amount = 0;
  constructor(money) {
    this.money = money;
    this.results = Array.from({ length: 5 }, () => 0);
  }

  countResult(count) {
    switch (count) {
      case 3:
        this.results[0] += 1;
        this.amount += LOTTO_WINNIG_PRIZE[0];
        break;
      case 4:
        this.results[1] += 1;
        this.amount += LOTTO_WINNIG_PRIZE[1];
        break;
      case 5:
        this.results[2] += 1;
        this.amount += LOTTO_WINNIG_PRIZE[2];
        break;
      case 6:
        this.results[3] += 1;
        this.amount += LOTTO_WINNIG_PRIZE[3];
        break;
      case 7:
        this.results[4] += 1;
        this.amount += LOTTO_WINNIG_PRIZE[4];
        break;
      default:
        break;
    }
  }
}
