import { input } from "./view/console/input";
import { output } from "./view/console/output";
import { LottoGame } from "./js/domain/LottoGame";
import { Lotto } from "./js/domain/Lotto";
import { isNumberValidator } from "./validator/isNumberValidator";
import { isArrLengthValidator } from "./validator/isArrLengthValidator";
import { hasNumberValidator } from "./validator/hasNumberValidator";
import { isDuplicateValidator } from "./validator/isDuplicateValidator";

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

    return bonusNumber;
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
      isDuplicateValidator(winningNumbers);
    } catch (error) {
      console.log(error.message);
      await this.getWinningNumbers();
    }
  }
  async validateBonusNumber(bonusNumber) {
    try {
      isNumberValidator(bonusNumber);
    } catch (error) {
      console.log(error.message);
      await this.getBonusNumber();
    }
  }
  async play() {
    await this.settingLottos();
    const winningNumbers = await this.getWinningNumbers();
  }
}

const app = new App();

app.play();
