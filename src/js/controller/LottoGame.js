import LottoMachine from '../domain/LottoMachine.js';
import LottoView from '../view/LottoView.js';

class LottoGame {
  #view = new LottoView();

  #lottoMachine = new LottoMachine();

  #recentPurchaseMoney = 0;

  #recentLottos = [];

  async start() {
    this.#recentPurchaseMoney = await this.#view.purchase();
    this.buyLotto();
  }

  buyLotto() {
    this.#recentLottos = this.#lottoMachine.buy(this.#recentPurchaseMoney);
  }
}

export default LottoGame;
