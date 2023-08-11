import Exchange from '../domain/Exchange.js';
import LottoMachine from '../domain/LottoMachine.js';
import LottoView from '../view/LottoView.js';

class LottoGame {
  #view = new LottoView();

  #exchange = null;

  #lottoMachine = new LottoMachine();

  #recentPurchaseMoney = 0;

  #recentLottos = [];

  #winningNumbers = [];

  #bonus = 0;

  #prizes = [];

  #rateOfReturn = 0;

  constructor(exchange) {
    this.#exchange = exchange;
  }

  async start() {
    await this.buyLotto();
    await this.setWinningNumbers();
    await this.setBonus();
    this.checkLottos();
    this.getRateOfReturn();
  }

  async buyLotto() {
    this.#recentPurchaseMoney = await this.#view.purchase();
    this.#recentLottos = this.#lottoMachine.buy(this.#recentPurchaseMoney);
    this.#view.renderBuyLottos(this.#recentLottos);
    this.#view.renderLottos(this.#recentLottos);
  }

  async setWinningNumbers() {
    this.#winningNumbers = await this.#view.winningNumbers();
  }

  async setBonus() {
    this.#bonus = await this.#view.bonus();
  }

  checkLottos() {
    this.#prizes = this.#recentLottos.map((lotto) => {
      lotto.check(this.#winningNumbers, this.#bonus);
      return this.#exchange.getLottoPrize(lotto);
    });
  }

  getRateOfReturn() {
    console.log(this.#prizes);
    const totalPrize = this.#prizes.reduce((total, cur) => total + cur, 0);
    this.#rateOfReturn = Exchange.calculateRateOfReturn(this.#recentPurchaseMoney, totalPrize);
  }
}

export default LottoGame;
