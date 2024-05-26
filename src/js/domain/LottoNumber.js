import { ErrorLottoNumber } from "../constants/error.js";

let instances;
class LottoNumber {
  static MAX_LOTTO_NUMBER = 45;
  static MIN_LOTTO_NUMBER = 1;
  static LOTTO_NUMBERS = Array.from(
    { length: LottoNumber.MAX_LOTTO_NUMBER },
    (_, i) => i + 1
  );

  #value;

  constructor(lottoNumber) {
    if (lottoNumber instanceof LottoNumber) {
      return lottoNumber;
    }

    if (instances && instances[lottoNumber]) {
      return instances[lottoNumber];
    }

    LottoNumber.#validateLottoNumber(lottoNumber);

    const validatedLottoNumber = Number(lottoNumber);

    this.#value = validatedLottoNumber;
  }

  get value() {
    return this.#value;
  }

  valueOf() {
    return this.#value;
  }

  static #validateLottoNumber(input) {
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

instances = LottoNumber.LOTTO_NUMBERS.reduce((acc, cur) => {
  acc[cur] = new LottoNumber(cur);
  return acc;
}, {});

export default LottoNumber;
