import { LOTTO_WINNIG_PRIZE, WINNING_CASE } from '../constants/index.js';
import { getProfitRate } from '../../util/index.js';

export class Customer {
  constructor() {
    this.money = 0;
    this.results = Array.from({ length: WINNING_CASE }, () => 0);
    this.amount = 0;
    this.profitRate = 0;
  }

  calculateResults(lottos, winningNumber, bonusNumber) {
    lottos.forEach((lotto) =>
      this.#countResult(this.#countWinningNumber(lotto, winningNumber, bonusNumber)),
    );
  }

  #countWinningNumber(lotto, winningNumber, bonusNumber) {
    const winningCount = winningNumber.filter((number) => lotto.includes(number));
    const bonusCount = lotto.includes(bonusNumber);

    if (bonusCount) {
      return winningCount.length === 4 ? 6 : winningCount.length === 5 ? 7 : winningCount.length;
    }
    return winningCount.length === 6 ? 7 : winningCount.length;
  }

  #countResult(count) {
    if (count < 3) {
      return;
    }

    this.results[count - 3] += 1;
    this.amount += LOTTO_WINNIG_PRIZE[count - 3];
  }

  getProfit() {
    return getProfitRate(this.money, this.amount);
  }
}
