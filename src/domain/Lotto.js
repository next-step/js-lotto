import { ErrorLotto } from "../constants/error";
import {
  LOTTO_NUMBER_LENGTH,
  MAX_NUMBER,
  MIN_NUMBER,
} from "../constants/number";
import { randomNumber, sortingNumber } from "../util/random";

class Lotto {
  #number = [];

  constructor(lottoNumbers) {
    this.validateLottoNumber(lottoNumbers);

    this.#number = lottoNumbers;
  }

  validateLottoNumber(lottoNumbers) {
    if (lottoNumbers.length !== LOTTO_NUMBER_LENGTH) {
      throw new Error(ErrorLotto.NUMBER_LENGTH_SIX);
    }

    if (
      lottoNumbers.some((number) => number > MAX_NUMBER || number < MIN_NUMBER)
    ) {
      throw new Error(ErrorLotto.OVER_MIN_MAX_NUMBER);
    }
    if (lottoNumbers.length !== new Set(lottoNumbers).size) {
      throw new Error(ErrorLotto.NUMBER_DUPLICATED);
    }
  }

  get number() {
    return this.#number;
  }
}

export default Lotto;
