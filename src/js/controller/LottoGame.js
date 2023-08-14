import LottoChecker from '../domain/LottoChecker.js';
import LottoMachine from '../domain/LottoMachine.js';
import LottoView from '../view/LottoView.js';

class LottoGame {
  #view = new LottoView();

  #lottoChecker = new LottoChecker();

  #lottoMachine = new LottoMachine();

  #recentPurchaseMoney = 0;

  #recentLottos = [];

  #winningNumbers = [];

  #bonus = 0;

  #result = 0;

  async start() {
    await this.buyLotto();
    await this.setWinningNumbers();
    await this.setBonus();
    this.checkLottos();
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
}

export default LottoGame;
