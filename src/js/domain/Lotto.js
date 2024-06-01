import { ErrorLottoNumbers } from "../constants/error.js";
import LottoNumber from "./LottoNumber.js";

class Lotto {
  static LENGTH_LOTTO_NUMBERS = 6;

  #lottoNumbers = [];

  constructor(input) {
    const lottoNumbers = Lotto.createLottoNumbers(input);

    Lotto.validateLotto(lottoNumbers);

    const sortedLottoNumbers =
      Lotto.sortLottoNumbersByAscendingOrder(lottoNumbers);
    this.#lottoNumbers = sortedLottoNumbers;
  }

  get lottoNumbers() {
    return [...this.#lottoNumbers];
  }

  get lottoNumberValues() {
    return this.#lottoNumbers.map((lottoNumber) => lottoNumber.value);
  }

  static validateLottoNumbers(lottoNumbers) {
    const lottoNumbersSet = new Set(lottoNumbers);

    if (lottoNumbers.length !== lottoNumbersSet.size) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED);
    }
  }

  static validateLotto(lottoNumbers) {
    Lotto.validateLottoNumbers(lottoNumbers);

    if (lottoNumbers.length !== this.LENGTH_LOTTO_NUMBERS) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_NOT_VALID_LENGTH);
    }
  }

  static createLottoNumbers(lottoNumbers) {
    if (Array.isArray(lottoNumbers)) {
      return lottoNumbers.map((lottoNumber) => new LottoNumber(lottoNumber));
    }

    if (typeof lottoNumbers === "string") {
      return lottoNumbers
        .split(",")
        .map((lottoNumber) => new LottoNumber(lottoNumber));
    }

    return [];
  }

  static sortLottoNumbersByAscendingOrder(lottoNumbers) {
    return [...lottoNumbers].sort((a, b) => a - b);
  }

  hasLottoNumber(lottoNumber) {
    return this.#lottoNumbers.includes(lottoNumber);
  }
}

export default Lotto;
