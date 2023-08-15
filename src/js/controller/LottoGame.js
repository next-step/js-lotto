import { Exchange, LottoChecker, LottoMachine } from '../domain/index.js';
import { LottoInputView, LottoOutputView } from '../view/Lotto/index.js';

class LottoGame {
  #inputView = new LottoInputView();

  #outputView = new LottoOutputView();

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
    this.#recentPurchaseMoney = await this.#inputView.purchase();
    this.#recentLottos = this.#lottoMachine.buy(this.#recentPurchaseMoney);
    this.#outputView.buyLottos(this.#recentLottos);
    this.#outputView.lottos(this.#recentLottos);
  }

  async setWinningNumbers() {
    this.#winningNumbers = await this.#inputView.winningNumbers();
  }

  async setBonus() {
    this.#bonus = await this.#inputView.bonus();
  }

  checkLottos() {
    this.#recentLottos.forEach((lotto) => {
      lotto.check(this.#winningNumbers, this.#bonus);
    });
    this.#result = this.#lottoChecker.getLottoRewardBoard(this.#recentLottos);
    this.#outputView.lottoResult(this.#result);
  }

  setTotalPrize() {
    this.#totalPrize = Exchange.getLottoPrize(this.#result);
  }

  setRateOfReturn() {
    this.#rateOfReturn = this.#exchange.calculateRateOfReturn(this.#recentPurchaseMoney, this.#totalPrize);
    this.#outputView.rateOfReturn(this.#rateOfReturn);
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
