import { getProfitRate, manipulateReadline } from '../../util/index.js';
import { LOTTO_PRICE } from '../constants/index.js';
import { Customer } from '../model/Customer.js';
import { LottoMachine } from '../model/LottoMachine.js';
import { LottoView } from '../view/LottoView.js';

export class LottoClerk {
  lotto_price = LOTTO_PRICE;

  constructor() {
    this.view = LottoView;
    this.machine = new LottoMachine();
  }

  purchaseLotto(money) {
    const count = Math.floor(money / this.lotto_price);

    this.customer = new Customer(count * this.lotto_price);
    this.view.LOTTO_COUNT(count);
    this.machine = new LottoMachine(count);
  }

  checkoutLotto(winning, bonus) {
    const totalCounts = this.machine.lottos.map((lotto) =>
      this.#countWinningNumber(lotto, winning, bonus),
    );
    totalCounts.forEach((count) => this.customer.countResult(count));
    this.announceResult();
  }
  announceResult() {
    const profitRate = getProfitRate(this.customer.money, this.customer.amount);
    this.view.LOTTO_RESULT(this.customer.results, profitRate);
    manipulateReadline.closeReadline();
  }

  #countWinningNumber(lotto, winning, bonus) {
    const winningCount = winning.filter((number) => lotto.includes(number)).length;
    const bonusCount = lotto.includes(bonus) ? 2 : 0;
    return winningCount + bonusCount;
  }
}
