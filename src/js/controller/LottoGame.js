import LottoMachine from '../domain/LottoMachine.js';
import LottoView from '../view/LottoView.js';

class LottoGame {
  #view = new LottoView();

  #lottoMachine = new LottoMachine();

  #recentPurchaseMoney = 0;

  #recentLottos = [];

  #winningNumbers = [];

  #bonus = 0;

  async start() {
    await this.buyLotto();
    await this.setWinningNumbers();
    await this.setBonus();
  }

  async buyLotto() {
    this.#recentPurchaseMoney = await this.#view.purchase();
    this.#recentLottos = this.#lottoMachine.buy(this.#recentPurchaseMoney);
  }

  async setWinningNumbers() {
    this.#winningNumbers = await this.#view.winningNumbers();
    console.log(this.#winningNumbers);
  }

  async setBonus() {
    this.#bonus = await this.#view.bonus();
    console.log(this.#bonus);
  }
}

export default LottoGame;
