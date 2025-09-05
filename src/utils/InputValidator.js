import { ERROR_MESSAGE } from "../constants/message.js";

class InputValidator {
  #validateAmount(amount) {
    if (/^\d+$/.test(amount)) {
      return true;
    }
    throw new Error(ERROR_MESSAGE.ONLY_NUMBER);
  }
  isValidateAmount(amount) {
    return this.#validateAmount(amount);
  }
}
export default InputValidator;
