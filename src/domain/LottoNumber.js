import { ErrorLotto } from "../constants/error";
import {
  LOTTO_NUMBER_LENGTH,
  MAX_NUMBER,
  MIN_NUMBER,
} from "../constants/number";

class LottoNumber {
  #number;

  constructor(inputNumber) {
    this.validateLottoNumber(inputNumber);

    this.#number = inputNumber;
  }

  validateLottoNumber(inputNumber) {
    if (inputNumber > MAX_NUMBER || inputNumber < MIN_NUMBER) {
      throw new Error(ErrorLotto.OVER_MIN_MAX_NUMBER);
    }
  }

  get number() {
    return this.#number;
  }
}

export default LottoNumber;
