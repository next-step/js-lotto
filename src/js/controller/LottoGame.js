import { Lotto, LottoMachine, LottoRewards, WinningLotto } from '../domain/index.js';
import { splitToNumberArray } from '../utils/splitToNumberArray.js';
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
    this.#money = Number((await this.#inputView.purchase()).trim());
    this.#lottos = this.#lottoMachine.buy(this.#money);

    this.showLottos();
  }

  async showLottos() {
    this.#outputView.buyLottos(this.#lottos.length);
    this.#lottos.forEach(({ numbers }) => this.#outputView.lotto(numbers));

    await this.withRetry(() => this.setWinningLotto());
  }

  async setWinningLotto() {
    const winningNumbers = splitToNumberArray(await this.#inputView.winningNumbers());
    const bonus = Number(await this.#inputView.bonus());
    this.#winningLotto = new WinningLotto(new Lotto(winningNumbers), bonus);

    await this.withRetry(() => this.setRewards());
  }

  async setRewards() {
    this.#rewards = new LottoRewards(this.#lottos, this.#winningLotto);

    this.showResult();
  }

  showResult() {
    this.#outputView.lottoResult();
    const rankResult = this.#rewards.getRankList();

    rankResult.forEach(({ reward, quantity }) => {
      this.#outputView.prize(reward, quantity);
    });

    this.calculateRateOfReturn();
  }

  async calculateRateOfReturn() {
    const rateOfReturn = this.#rewards.computeRateOfReturn(this.#money);
    this.#outputView.rateOfReturn(rateOfReturn);

    await this.withRetry(() => this.askRetry());
  }

  async askRetry() {
    const retry = await this.#inputView.retry();
    if (!retry) {
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
