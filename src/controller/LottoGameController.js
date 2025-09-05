import { LOTTO } from "../constants/lottos.js";
import InputValidator from "../utils/InputValidator.js";

class LottoGameController {
  #view;
  #amount;
  #inputValidator = new InputValidator();

  constructor(view) {
    this.#view = view;
  }

  async startLotto() {
    const amount = await this.#view.readPurchaseAmount();

    if (!this.#inputValidator.isValidateAmount(amount)) {
      return;
    }
    this.#amount = amount;
    console.log(amount);
    const count = this.#amount / LOTTO.PRICE;
    this.#view.printPurchaseAmountResult(count);
  }

  set amount(amount) {
    if (this.#inputValidator.isValidateAmount(amount)) {
      this.#amount = amount;
    }
  }

  get amount() {
    return this.#amount;
  }
}

export default LottoGameController;
