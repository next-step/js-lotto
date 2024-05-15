import { ERROR_CODES } from "./constants/error";
import { Lotto } from "./domain/Lotto";

export class App {
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
