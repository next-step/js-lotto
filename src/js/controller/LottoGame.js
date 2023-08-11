import LottoView from '../view/LottoView.js';

class LottoGame {
  #view = new LottoView();

  #recentPurchaseMoney;

  async start() {
    this.#recentPurchaseMoney = await this.#view.purchase();
  }
}

export default LottoGame;
