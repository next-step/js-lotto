import { LOTTO_RETRY_CODE } from '../constants/lotto-config.js';
import { WinningLotto } from '../domain/WinningLotto.js';
import { Exchange, LottoReward, LottoMachine } from '../domain/index.js';
import checkValidRetry from '../validator/retry.js';
import { LottoInputView, LottoOutputView } from '../view/Lotto/index.js';

class LottoGame {
  #inputView = new LottoInputView();

  #outputView = new LottoOutputView();

  #lottoMachine = new LottoMachine();

  #exchange = new Exchange();

  #money = 0;

  #lottos = [];

  #winningLotto = null;

  #prizes = [];

  #totalPrize = 0;

  #rateOfReturn = null;

  async start() {
    await this.withRetry(() => this.setMoney());
  }

  async setMoney() {
    this.#money = await this.#inputView.purchase();
    this.buyLotto();
  }

  async buyLotto() {
    this.#lottos = this.#lottoMachine.buy(this.#money);
    this.#outputView.buyLottos(this.#lottos);
    this.#lottos.forEach(({ numbers }) => this.#outputView.lotto(numbers));
    await this.withRetry(() => this.setWinningLotto());
  }

  async setWinningLotto() {
    const winningNumbers = await this.#inputView.winningNumbers();
    const bonus = await this.#inputView.bonus();
    this.#winningLotto = new WinningLotto(winningNumbers, bonus);
    await this.withRetry(() => this.checkLottos());
  }

  checkLottos() {
    this.#prizes = this.#lottos.map((lotto) => LottoReward.getReward(this.#winningLotto, lotto));
    console.log(this.#prizes);
    this.setTotalPrize();
  }

  setTotalPrize() {
    this.#totalPrize = Exchange.getTotalPrize(this.#prizes);
    this.setRateOfReturn();
  }

  async setRateOfReturn() {
    this.#rateOfReturn = this.#exchange.calculateRateOfReturn(this.#money, this.#totalPrize);
    this.#outputView.rateOfReturn(this.#rateOfReturn);
    await this.withRetry(() => this.askRetry());
  }

  async askRetry() {
    const retry = await this.#inputView.retry();
    checkValidRetry(retry);
    if (retry === LOTTO_RETRY_CODE.CONFIRM) {
      this.start();
      return;
    }
    process.exit();
  }

  async withRetry(action) {
    try {
      await action();
    } catch ({ message }) {
      this.#outputView.error(message);
      await this.withRetry(action);
    }
  }
}

export default LottoGame;
