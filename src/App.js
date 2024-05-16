import { ERROR_CODES } from "./constants/error";
import { Lotto } from "./domain/Lotto";
import { View } from "./views/view";

export class App {
  async play() {
    const amount = await View.inputAmount();
  }

  getLottoAmount(amount) {
    return Math.floor(amount / Lotto.PRICE);
  }

  buyLotto(amount) {
    this.validateAmount(amount);
  }

  validateAmount(amount) {
    if (amount < Lotto.PRICE) {
      throw new Error(ERROR_CODES.ERROR_AMOUNT_TOO_SMALL);
    }
  }
}
