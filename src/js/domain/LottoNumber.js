import { ErrorLottoNumber } from "../constants/error.js";
const instances = [];
class LottoNumber {
  static MAX_LOTTO_NUMBER = 45;
  static MIN_LOTTO_NUMBER = 1;

  #value;

  constructor(lottoNumber) {
    if (lottoNumber instanceof LottoNumber) {
      return lottoNumber;
    }

    LottoNumber.validateLottoNumber(lottoNumber);

    const validatedLottoNumber = Number(lottoNumber);

    if (instances[validatedLottoNumber]) {
      return instances[validatedLottoNumber];
    }

    this.#value = validatedLottoNumber;

    instances[validatedLottoNumber] = this;
  }

  get value() {
    return this.#value;
  }

  valueOf() {
    return this.#value;
  }

  static validateLottoNumber(input) {
    if (input instanceof LottoNumber) {
      return;
    }

    if (isNaN(input)) {
      throw new Error(ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_NUMBER);
    }

    if (!Number.isInteger(Number(input))) {
      throw new Error(ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER);
    }

    if (
      Number(input) < this.MIN_LOTTO_NUMBER ||
      Number(input) > this.MAX_LOTTO_NUMBER
    ) {
      throw new Error(ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER);
    }
  }
}

export default LottoNumber;
