import { LOTTO_RETRY_CODE } from '../constants/lotto-config.js';
import { WinningLotto } from '../domain/WinningLotto.js';
import { LottoMachine, LottoRewards } from '../domain/index.js';
import checkValidRetry from '../validator/retry.js';
import { LottoInputView, LottoOutputView } from '../view/Lotto/index.js';

class LottoGame {
  #inputView = new LottoInputView();

  #outputView = new LottoOutputView();

  #lottoMachine = new LottoMachine();

  #money = 0;

  #lottos = [];

  #winningLotto = null;

  #rewards;

  async start() {
    await this.withRetry(() => this.buyLotto());
  }

  async buyLotto() {
    this.#money = await this.#inputView.purchase();
    this.#lottos = this.#lottoMachine.buy(this.#money);

    this.showLottos();
  }

  async showLottos() {
    this.#outputView.buyLottos(this.#lottos.length);
    this.#lottos.forEach(({ numbers }) => this.#outputView.lotto(numbers));

    await this.withRetry(() => this.setWinningLotto());
  }

  async setWinningLotto() {
    const winningNumbers = await this.#inputView.winningNumbers();
    const bonus = await this.#inputView.bonus();
    this.#winningLotto = new WinningLotto(winningNumbers, bonus);

    await this.withRetry(() => this.setRewards());
  }

  async setRewards() {
    this.#rewards = new LottoRewards(this.#lottos, this.#winningLotto);

    this.showResult();
  }

  showResult() {
    this.#outputView.lottoResult();
    Object.keys(this.#rewards.prizeTable).forEach((rank) => {
      this.#outputView.prize(this.#rewards.prizeTable[rank]);
    });

    this.calculateRateOfReturn();
  }

  async calculateRateOfReturn() {
    const rateOfReturn = this.#rewards.getRateOfReturn(this.#money);
    this.#outputView.rateOfReturn(rateOfReturn);

    await this.withRetry(() => this.askRetry());
  }

  async askRetry() {
    const retry = await this.#inputView.retry();
    checkValidRetry(retry);
    if (retry === LOTTO_RETRY_CODE.REJECT) {
      process.exit();
    }

    this.start();
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
