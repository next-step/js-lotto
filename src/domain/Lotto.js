import { ErrorLotto } from "../constants/error";
import {
  LOTTO_NUMBER_LENGTH,
  MAX_NUMBER,
  MIN_NUMBER,
} from "../constants/number";
import { randomNumber, sortingNumber } from "../util/random";

class Lotto {
  #numbers;

  constructor(lottoNumbers) {
    this.validateLottoNumbers(lottoNumbers);

    this.#numbers = lottoNumbers;
  }

  validateLottoNumbers(lottoNumbers) {
    if (lottoNumbers.length !== LOTTO_NUMBER_LENGTH) {
      throw new Error(ErrorLotto.NUMBER_LENGTH_SIX);
    }

    if (lottoNumbers.length !== new Set(lottoNumbers).size) {
      throw new Error(ErrorLotto.NUMBER_DUPLICATED);
    }
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
