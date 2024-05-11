import { input } from "./view/console/input";
import { output } from "./view/console/output";
import { LottoGame } from "./js/domain/LottoGame";
import { Lotto } from "./js/domain/Lotto";
import { isNumberValidator } from "./validator/isNumberValidator";
class App {
  #lottoGame;
  #lottos;
  constructor() {
    this.#lottoGame;
    this.#lottos;
  }

  async settingLottos() {
    const purchasePrice = await input.purchasePrice();
    this.validatePurchasePrice(purchasePrice);
    const lotto = new Lotto(purchasePrice);
    lotto.purchaseLottos();
    this.#lottos = lotto.lottos;
    output.lottos(this.#lottos);
  }

  async settingLottoGame() {
    const winningNumbers = await input.winningLotto();
    const bonusNumber = await input.bonusNumber();
    this.#lottoGame = new LottoGame(this.#lottos, winningNumbers, bonusNumber);
  }

  async validatePurchasePrice(purchasePrice) {
    try {
      isNumberValidator(purchasePrice);
    } catch (error) {
      console.log(error.message);
      app.settingLottos();
    }
  }
}

const app = new App();
app.settingLottos();
