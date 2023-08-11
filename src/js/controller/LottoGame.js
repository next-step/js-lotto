import LottoMachine from '../domain/LottoMachine.js';
import LottoView from '../view/LottoView.js';

class LottoGame {
  #view = new LottoView();

  #lottoMachine = new LottoMachine();

  #recentPurchaseMoney = 0;

  #recentLottos = [];

  #winningNumbers = [];

  async start() {
    await this.buyLotto();
    await this.setWinningNumbers();
  }

  async buyLotto() {
    this.#recentPurchaseMoney = await this.#view.purchase();
    this.#recentLottos = this.#lottoMachine.buy(this.#recentPurchaseMoney);
  }

  async setWinningNumbers() {
    this.#winningNumbers = await this.#view.winningNumbers();
    console.log(this.#winningNumbers);
  }
}

export default LottoGame;
