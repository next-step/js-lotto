import { getProfitRate } from '../../util/index.js';
import { LOTTO_PRICE } from '../constants/index.js';
import { Customer } from '../model/Customer.js';
import { LottoMachine } from '../model/LottoMachine.js';
import { LottoInput } from '../view/LottoInput.js';
import { LottoOutput } from '../view/LottoOutput.js';

export class LottoClerk {
  lottoPrice = LOTTO_PRICE;
  output = LottoOutput;
  input = LottoInput;

  constructor() {
    this.enterLottoStore();
  }

  async enterLottoStore() {
    const money = await this.input.ASK_MONEY();
    this.purchaseLotto(money);

    const winningNumbers = await this.input.ASK_WINNING_NUMBERS();
    const bonus = await this.input.ASK_BONUS_NUMBER(winningNumbers);
    this.checkoutLotto(winningNumbers, bonus);
  }

  purchaseLotto(money) {
    const count = Math.floor(money / this.lottoPrice);

    this.customer = new Customer(count * this.lottoPrice);
    this.output.LOTTO_COUNT(count);
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
    this.output.LOTTO_RESULT(this.customer.results, profitRate);
    this.input.EXIT_LOTTO_STORE();
  }

  #countWinningNumber(lotto, winning, bonus) {
    const winningCount = winning.filter((number) => lotto.includes(number)).length;
    const bonusCount = lotto.includes(bonus) ? 2 : 0;
    return winningCount + bonusCount;
  }
}
