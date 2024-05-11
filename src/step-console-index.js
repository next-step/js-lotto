import { input } from "./view/console/input";
import { output } from "./view/console/output";
import { LottoGame } from "./js/domain/LottoGame";
import { Lotto } from "./js/domain/Lotto";
import { isNumberValidator } from "./validator/isNumberValidator";
import { isArrLengthValidator } from "./validator/isArrLengthValidator";
import { hasNumberValidator } from "./validator/hasNumberValidator";

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

  async getWinningNumbers() {
    const winningNumbers = await input.winningLotto();
    this.validateWinningNumbers(winningNumbers);
    return winningNumbers;
  }

  async getBonusNumber() {
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

  async validateWinningNumbers(winningNumbers) {
    try {
      isArrLengthValidator(winningNumbers);
      hasNumberValidator(winningNumbers);
    } catch (error) {
      console.log(error.message);
      app.settingLottoGame();
    }
  }

  async play() {
    await this.settingLottos();
    await this.settingWinningNumbers();
  }
}

const app = new App();

app.play();
