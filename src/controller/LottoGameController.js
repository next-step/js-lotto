import { LOTTO } from "../constants/lottos.js";
import InputValidator from "../utils/InputValidator.js";
import LottoService from "./LottoService.js";

class LottoGameController {
  #view;
  #amount;
  #lottos;
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

    const { winningNumbers, bonusNumber } = this.#inputWinningNumbers();
    this.#checkWinningResult({ winningNumbers, bonusNumber });
  }

  async #inputWinningNumbers() {
    const winningNumbers = await this.#view.readWinningNumbers();
    const bonusNumber = await this.#view.readBonusNumber();
    return { winningNumbers, bonusNumber };
  }

  #checkWinningResult({ winningNumbers, bonusNumber }) {}
}
export default LottoGameController;
