import Exchange from '../domain/Exchange.js';
import LottoChecker from '../domain/LottoChecker.js';
import LottoMachine from '../domain/LottoMachine.js';
import LottoView from '../view/LottoView.js';

class LottoGame {
  #view = new LottoView();

  #lottoChecker = new LottoChecker();

  #lottoMachine = new LottoMachine();

  #exchange = new Exchange();

  #recentPurchaseMoney = 0;

  #recentLottos = [];

  #winningNumbers = [];

  #bonus = 0;

  #result = 0;

  #totalPrize = 0;

  #rateOfReturn = null;

  async start() {
    await this.buyLotto();
    await this.setWinningNumbers();
    await this.setBonus();
    this.checkLottos();
    this.setTotalPrize();
    this.setRateOfReturn();
    this.stopGame();
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
    this.#recentLottos.forEach((lotto) => {
      lotto.check(this.#winningNumbers, this.#bonus);
    });
    this.#result = this.#lottoChecker.getLottoRewardBoard(this.#recentLottos);
    this.#view.renderLottoResult(this.#result);
  }

  setTotalPrize() {
    this.#totalPrize = Exchange.getLottoPrize(this.#result);
  }

  setRateOfReturn() {
    this.#rateOfReturn = this.#exchange.calculateRateOfReturn(this.#recentPurchaseMoney, this.#totalPrize);
    this.#view.renderRateOfReturn(this.#rateOfReturn);
  }

  stopGame() {
    this.reset();
    process.exit();
  }

  reset() {
    this.#recentPurchaseMoney = 0;
    this.#recentLottos = [];
    this.#winningNumbers = [];
    this.#bonus = 0;
    this.#result = 0;
    this.#totalPrize = 0;
    this.#rateOfReturn = null;
  }
}

export default LottoGame;
