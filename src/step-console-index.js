import { input } from "./view/console/input";
import { output } from "./view/console/output";
import { LottoGame } from "./js/domain/LottoGame";
import { Lotto } from "./js/domain/Lotto";
class App {
  #lottoGame;
  #lottos;
  constructor() {
    this.#lottoGame;
    this.#lottos;
  }

  async settingLottos() {
    const purchasePrice = await input.purchasePrice();
    const lotto = new Lotto(purchasePrice);
    lotto.purchaseLottos();
    this.#lottos = lotto.lottos;
    output.lottos(this.#lottos);
  }

  async settingLottoGame() {
    const winningLotto = await input.winningLotto();
    const bonusNumber = await input.bonusNumber();
    this.#lottoGame = new LottoGame(this.#lottos, winningLotto, bonusNumber);
  }
}

const app = new App();
app.settingLottos();
