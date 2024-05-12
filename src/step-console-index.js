import { input } from "./view/console/input";
import { output } from "./view/console/output";
import { LottoGame } from "./js/domain/LottoGame";
import { Lotto } from "./js/domain/Lotto";
import { isIntegerValidator } from "./validator/isIntegerValidator";
import { isArrLengthValidator } from "./validator/isArrLengthValidator";
import { hasNumberValidator } from "./validator/hasNumberValidator";
import { isDuplicateValidator } from "./validator/isDuplicateValidator";
import { isContainValidator } from "./validator/isContainValidator";

class App {
  #lottos;
  constructor() {
    this.#lottos;
  }

  async settingLottos() {
    try {
      const purchasePrice = await input.purchasePrice();
      this.validatePurchasePrice(purchasePrice);
      const lotto = new Lotto(purchasePrice);
      lotto.purchaseLottos();
      this.#lottos = lotto.lottos;
      output.lottosCount(this.#lottos.length);
      output.lottos(this.#lottos);
      return purchasePrice;
    } catch (error) {
      console.log(error.message);
      await this.settingLottos();
    }
  }

  async getPurchasePrice() {
    try {
      const purchasePrice = await input.purchasePrice();
      this.validatePurchasePrice(purchasePrice);

      return purchasePrice;
    } catch (error) {
      console.log(error.message);
      await this.getPurchasePrice();
    }
  }

  async getWinningNumbers() {
    try {
      const winningNumberArray = await input.winningLotto();
      this.validateWinningNumbers(winningNumberArray);

      return winningNumberArray;
    } catch (error) {
      console.log(error.message);
      await this.getWinningNumbers();
    }
  }

  async getBonusNumber(winningNumberArray) {
    try {
      const bonusNumber = await input.bonusNumber();
      this.validateBonusNumber(winningNumberArray, bonusNumber);

      return bonusNumber;
    } catch (error) {
      console.log(error.message);
      await this.getBonusNumber(winningNumberArray);
    }
  }

  validatePurchasePrice(purchasePrice) {
    isIntegerValidator(purchasePrice);
  }

  validateWinningNumbers(winningNumberArray) {
    isArrLengthValidator(winningNumberArray);
    hasNumberValidator(winningNumberArray);
    isDuplicateValidator(winningNumberArray);
  }

  validateBonusNumber(winningNumberArray, bonusNumber) {
    isIntegerValidator(bonusNumber);
    isContainValidator(winningNumberArray, bonusNumber);
  }

  async play() {
    const purchasePrice = await this.settingLottos();
    const winningNumberArray = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumberArray);
    const lottoGame = new LottoGame(this.#lottos, winningNumberArray, bonusNumber);
    lottoGame.checkLottos();
    const result = lottoGame.result;
    output.result(result);
    output.rateOfReturn(purchasePrice);
  }
}

const app = new App();

app.play();
