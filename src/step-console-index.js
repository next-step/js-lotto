import { input } from "./view/console/input";
import { output } from "./view/console/output";
import { LottoGame } from "./js/domain/LottoGame";
import { Lotto } from "./js/domain/Lotto";
import { isNumberValidator } from "./validator/isNumberValidator";
import { isArrLengthValidator } from "./validator/isArrLengthValidator";
import { hasNumberValidator } from "./validator/hasNumberValidator";
import { isDuplicateValidator } from "./validator/isDuplicateValidator";
import { isContainValidator } from "./validator/isContainValidator";

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
    const winningNumberArray = await input.winningLotto();
    this.validateWinningNumbers(winningNumberArray);

    return winningNumberArray;
  }

  async getBonusNumber(winningNumberArray) {
    const bonusNumber = await input.bonusNumber();
    this.validateBonusNumber(winningNumberArray, bonusNumber);

    return bonusNumber;
  }

  async validatePurchasePrice(purchasePrice) {
    try {
      isNumberValidator(purchasePrice);
    } catch (error) {
      console.log(error.message);
    }
  }

  async validateWinningNumbers(winningNumberArray) {
    try {
      isArrLengthValidator(winningNumberArray);
      hasNumberValidator(winningNumberArray);
      isDuplicateValidator(winningNumberArray);
    } catch (error) {
      console.log(error.message);
    }
  }

  async validateBonusNumber(winningNumberArray, bonusNumber) {
    try {
      isNumberValidator(bonusNumber);
      isContainValidator(winningNumberArray, bonusNumber);
    } catch (error) {
      console.log(error.message);
    }
  }
  async play() {
    await this.settingLottos();
    const winningNumberArray = await this.getWinningNumbers();
    console.log("qqwe");
    const bonusNumber = await this.getBonusNumber(winningNumberArray);
    this.#lottoGame = new LottoGame(
      this.#lottos,
      winningNumberArray,
      bonusNumber
    );
  }
}

const app = new App();

app.play();
