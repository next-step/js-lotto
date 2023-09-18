import {
  LottoNumbersNotArrayError,
  LottoNumbersLengthNotSixError,
  LottoNumberNotNumberError,
  LottoNumberOutOfRangeError,
  LottoNumberDuplicatedError,
} from "./errors.js";
import {
  LOTTO_DIGITS,
  LOTTO_LOWER_BOUND,
  LOTTO_UPPER_BOUND,
} from "../../constants.js";

export default class Lotto {
  #lottoNumbers;

  static of(lottoNumbers) {
    return new Lotto(lottoNumbers);
  }

  constructor(lottoNumbers) {
    this.#validateLottoNumbers(lottoNumbers);

    this.#lottoNumbers = lottoNumbers;
  }

  #validateLottoNumbers(lottoNumbers) {
    if (!Array.isArray(lottoNumbers)) throw new LottoNumbersNotArrayError();
    if (lottoNumbers.length !== LOTTO_DIGITS)
      throw new LottoNumbersLengthNotSixError();
    if (this.#hasNotNumberLottoNumbers(lottoNumbers))
      throw new LottoNumberNotNumberError();
    if (this.#hasOutOfRangeLottoNumbers(lottoNumbers))
      throw new LottoNumberOutOfRangeError();
    if (this.#hasDuplicatedLottoNumbers(lottoNumbers))
      throw new LottoNumberDuplicatedError();
  }

  #hasNotNumberLottoNumbers(lottoNumbers) {
    return lottoNumbers.some((lottoNumber) => typeof lottoNumber !== "number");
  }

  #hasOutOfRangeLottoNumbers(lottoNumbers) {
    return lottoNumbers.some(
      (lottoNumber) =>
        lottoNumber < LOTTO_LOWER_BOUND || lottoNumber > LOTTO_UPPER_BOUND
    );
  }

  #hasDuplicatedLottoNumbers(lottoNumbers) {
    return new Set(lottoNumbers).size !== lottoNumbers.length;
  }

  display() {
    return this.#lottoNumbers;
  }
}
