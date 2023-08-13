import { LottoView } from '../view/LottoView.js';
import { LOTTO_PRICE, LOTTO_WINNIG_PRIZE } from '../constants/index.js';
import { LottoMachine } from '../model/LottoMachine.js';
import { profitRateCalculator, readlineController } from '../../util/index.js';

export class LottoClerk {
  view;
  lotto_price = LOTTO_PRICE;
  machine;

  constructor() {
    this.view = LottoView;
  }

  purchaseLotto(money) {
    const count = Math.floor(money / this.lotto_price);

    this.view.LOTTO_COUNT(count);
    this.machine = new LottoMachine(count);
  }

  askResults(winning, bonus) {
    this.machine.lottos.forEach((lotto) => {
      const count = this.#countWinningNumber(lotto, [...winning, bonus]);
      count === 5 && lotto.includes(bonus)
        ? this.machine.recordResult(6)
        : this.machine.recordResult(count);
    });

    this.view.LOTTO_RESULT(this.results, this.#calculateProfit());

    readlineController.closeReadline();
  }

  #countWinningNumber(lotto, numbers) {
    return numbers.filter((number) => lotto.includes(number)).length;
  }

  #calculateProfit() {
    const totalAmount = this.machine.results.reduce((acc, cur, idx) => acc + cur * LOTTO_WINNIG_PRIZE[idx],0);
    const initialBudget = this.machine.lottos.length * LOTTO_PRICE;

    return profitRateCalculator(initialBudget, totalAmount);
  }
}
