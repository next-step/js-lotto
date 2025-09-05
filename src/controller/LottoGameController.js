import { LOTTO } from "../constants/lottos.js";
import InputValidator from "../utils/InputValidator.js";
import LottoService from "./LottoService.js";

class LottoGameController {
  #view;
  #amount;
  #winningNumbers;
  #bonusNumber;
  #inputValidator = new InputValidator();

  constructor(view) {
    this.#view = view;
  }

  set amount(amount) {
    if (this.#inputValidator.isValidateAmount(amount)) {
      this.#amount = amount;
    }
  }

  get amount() {
    return this.#amount;
  }

  set winningNumbers(winningNumbers) {
    if (this.#inputValidator.isValidWinningNumbers(winningNumbers)) {
      this.#winningNumbers = winningNumbers;
    }
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  set bonusNumber(bonusNumber) {
    if (this.#inputValidator.isValidateBonusNumber(bonusNumber)) {
      this.#bonusNumber = Number(bonusNumber);
    }
  }

  get bonusNumber() {
    return this.#winningNumbers;
  }

  async startLotto() {
    const amount = await this.#view.readPurchaseAmount();

    if (!this.#inputValidator.isValidateAmount(amount)) {
      return;
    }
    this.#amount = amount;
    const count = this.#amount / LOTTO.PRICE;
    this.#view.printPurchaseAmountResult(count);

    const lottos = LottoService.generateLottos(count);
    this.#view.printGeneratedLottoNumbers(lottos);
    this.#view.printDivider();

    const winningNumbers = await this.#inputWinningNumbers();
    const bonusNumber = await this.#inputBonusNumber();
    if (!winningNumbers || !bonusNumber) return;

    this.#checkWinningResult({ winningNumbers, bonusNumber });
  }

  async #inputWinningNumbers() {
    const winningNumbers = await this.#view.readWinningNumbers();
    if (!this.#inputValidator.isValidWinningNumbers(winningNumbers)) {
      return;
    }
    return winningNumbers;
  }
  async #inputBonusNumber() {
    const bonusNumber = await this.#view.readBonusNumber();
    if (!this.#inputValidator.isValidateBonusNumber(bonusNumber)) {
      return;
    }
    return bonusNumber;
  }

  #checkWinningResult({ winningNumbers, bonusNumber }) {}
}
export default LottoGameController;
