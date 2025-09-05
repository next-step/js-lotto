import { LOTTO } from "../constants/lottos.js";
import { ERROR_MESSAGE } from "../constants/message.js";

class InputValidator {
  #validateAmount(amount) {
    if (/^\d+$/.test(amount)) {
      if (amount < LOTTO.PRICE) {
        throw new Error(ERROR_MESSAGE.MIN_PRICE);
      }
      return true;
    }
    throw new Error(ERROR_MESSAGE.ONLY_NUMBER);
  }
  isValidateAmount(amount) {
    return this.#validateAmount(amount);
  }
}
export default InputValidator;
