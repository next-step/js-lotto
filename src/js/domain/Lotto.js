import { ErrorLottoNumbers } from "../constants/error.js";
import LottoNumber from "./LottoNumber.js";

class Lotto {
  static LENGTH_LOTTO_NUMBERS = 6;

  #lottoNumberInstances = [];

  constructor(input) {
    const lottoNumberInstances = Lotto.createLottoNumberInstances(input);

    Lotto.validateLottoNumbers(lottoNumberInstances);

    const sortedLottoNumberInstances =
      Lotto.sortLottoNumbersByAscendingOrder(lottoNumberInstances);
    this.#lottoNumberInstances = sortedLottoNumberInstances;
  }

  get lottoNumberInstances() {
    return [...this.#lottoNumberInstances];
  }

  get lottoNumbers() {
    return this.#lottoNumberInstances.map(
      (lottoNumberInstance) => lottoNumberInstance.value
    );
  }

  static validateLottoNumbers(lottoNumbers) {
    const lottoNumbersSet = new Set(lottoNumbers);

    if (lottoNumbers.length !== this.LENGTH_LOTTO_NUMBERS) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_NOT_VALID_LENGTH);
    }

    if (lottoNumbers.length !== lottoNumbersSet.size) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED);
    }

    return lottoNumbers;
  }

  static createLottoNumberInstances(lottoNumbers) {
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

  hasLottoNumberInstance(lottoNumberInstance) {
    return this.#lottoNumberInstances.includes(lottoNumberInstance);
  }
}

export default Lotto;
