import { LOTTO_RETRY_CODE } from '../constants/lotto-config.js';
import { WinningLotto } from '../domain/WinningLotto.js';
import { Exchange, LottoChecker, LottoMachine } from '../domain/index.js';
import { checkValidRetry } from '../validator/index.js';
import { LottoInputView, LottoOutputView } from '../view/Lotto/index.js';

class LottoGame {
  #inputView = new LottoInputView();

  #outputView = new LottoOutputView();

  #lottoChecker = new LottoChecker();

  #lottoMachine = new LottoMachine();

  #exchange = new Exchange();

  #recentPurchaseMoney = 0;

  #recentLottos = [];

  #result = null;

  #totalPrize = 0;

  #rateOfReturn = null;

  #winningLotto = null;

  get recentPurchaseMoney() {
    return this.#recentPurchaseMoney;
  }

  get recentLottos() {
    return this.#recentLottos;
  }

  get result() {
    return this.#result;
  }

  get totalPrize() {
    return this.#totalPrize;
  }

  get rateOfReturn() {
    return this.#rateOfReturn;
  }

  async start() {
    await this.withRetry(() => this.buyLotto());
  }

  async buyLotto() {
    const money = await this.#inputView.purchase();
    this.#recentPurchaseMoney = money;
    this.#recentLottos = this.#lottoMachine.buy(money);
    this.#outputView.buyLottos(this.#recentLottos);
    this.#recentLottos.forEach((lotto) => {
      const numbers = lotto.numbers.map((number) => number.value);
      this.#outputView.lotto(numbers);
    });
    await this.withRetry(() => this.setWinningLotto());
  }

  async setWinningLotto() {
    const winningNumbers = await this.#inputView.winningNumbers();
    const bonus = await this.#inputView.bonus();
    this.#winningLotto = new WinningLotto(winningNumbers, bonus);
    await this.withRetry(() => this.checkLottos());
  }

  checkLottos() {
    this.#recentLottos.forEach((lotto) => {
      lotto.check(this.#winningLotto);
    });
    this.#result = this.#lottoChecker.getLottoRewardBoard(this.#recentLottos);
    this.#outputView.lottoResult(this.#result);
    this.setTotalPrize();
  }

  setTotalPrize() {
    this.#totalPrize = Exchange.getLottoPrize(this.#result);
    this.setRateOfReturn();
  }

  async setRateOfReturn() {
    this.#rateOfReturn = this.#exchange.calculateRateOfReturn(this.#recentPurchaseMoney, this.#totalPrize);
    this.#outputView.rateOfReturn(this.#rateOfReturn);
    await this.withRetry(() => this.askRetry());
  }

  async askRetry() {
    const retry = await this.#inputView.retry();
    checkValidRetry(retry);
    if (retry === LOTTO_RETRY_CODE.CONFIRM) {
      this.retryGame();
      return;
    }
    process.exit();
  }

  retryGame() {
    this.reset();
    this.start();
  }

  reset() {
    this.#recentPurchaseMoney = 0;
    this.#recentLottos = [];
    this.#result = null;
    this.#totalPrize = 0;
    this.#rateOfReturn = null;
  }

  async withRetry(action) {
    try {
      await action();
    } catch ({ message }) {
      this.#outputView.error(message);
      await this.withRetry(() => action());
    }
  }
}

export default LottoGame;
