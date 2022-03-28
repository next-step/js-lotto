import { FIVE_PLUS_BONUS } from '../constants/index.js';

const returns = new Map([
  [3, 5000],
  [4, 50000],
  [5, 1500000],
  [FIVE_PLUS_BONUS, 30000000],
  [6, 2000000000],
]);

export class LottoResults {
  sameCounts = new Map([
    [3, 0],
    [4, 0],
    [5, 0],
    [FIVE_PLUS_BONUS, 0],
    [6, 0],
  ]);
  rateOfReturn;
  money;

  constructor() {}

  getSameCounts() {
    return new Map(this.sameCounts);
  }

  getRateOfReturn() {
    return this.rateOfReturn;
  }

  setMoney(money) {
    this.money = money;
  }

  updateSameCounts(sameNumbers) {
    this.sameCounts.set(sameNumbers, this.sameCounts.get(sameNumbers) + 1);
  }

  calculateRateOfReturn() {
    const { sameCounts, money } = this;

    const totalReturn =
      sameCounts.get(3) * returns.get(3) +
      sameCounts.get(4) * returns.get(4) +
      sameCounts.get(5) * returns.get(5) +
      sameCounts.get(FIVE_PLUS_BONUS) * returns.get(FIVE_PLUS_BONUS) +
      sameCounts.get(6) * returns.get(6) -
      money;

    this.rateOfReturn = (totalReturn / money) * 100;
  }
}
