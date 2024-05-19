import { ErrorLottoNumbers } from "../constants/error";
import LottoNumber from "./LottoNumber";

class Lotto {
  static LENGTH_LOTTO_NUMBERS = 6;

  #lottoNumbers = [];

  constructor(input) {
    Lotto.validateLottoNumbers(input);
    const lottoNumbers = Lotto.convertLottoNumbersToLottoNumberArray(input);
    const sortedLottoNumbers =
      Lotto.sortLottoNumbersByAscendingOrder(lottoNumbers);
    this.#lottoNumbers = sortedLottoNumbers;
  }

  get lottoNumbers() {
    return [...this.#lottoNumbers];
  }

  get numbers() {
    return this.#lottoNumbers.map((lottoNumber) => lottoNumber.value);
  }

  static validateLottoNumbers(input) {
    const lottoNumbers = Lotto.convertLottoNumbersToLottoNumberArray(input);
    const lottoNumbersSet = new Set(lottoNumbers);

    if (lottoNumbers.length !== this.LENGTH_LOTTO_NUMBERS) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_NOT_VALID_LENGTH);
    }

    if (lottoNumbers.length !== lottoNumbersSet.size) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED);
    }
  }

  static generateRandomLottoNumbers() {
    const lottoNumbers = [];
    const candidateLottoNumbers = Array.from(
      { length: LottoNumber.MAX_LOTTO_NUMBER },
      (_, i) => i + 1
    );

    for (let i = 0; i < Lotto.LENGTH_LOTTO_NUMBERS; i++) {
      const randomIndex = Math.floor(
        Math.random() * candidateLottoNumbers.length
      );

      const deletedNumbers = candidateLottoNumbers.splice(randomIndex, 1);
      lottoNumbers.push(...deletedNumbers);
    }

    return lottoNumbers;
  }

  static convertLottoNumbersToLottoNumberArray(lottoNumbers) {
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

  countMatchingLottoNumbers(lotto) {
    const matchedLottoNumbers = this.#lottoNumbers.filter((lottoNumber) =>
      lotto.lottoNumbers.includes(lottoNumber)
    );
    return matchedLottoNumbers.length;
  }

  hasLottoNumber(lottoNumber) {
    return this.#lottoNumbers.includes(lottoNumber);
  }
}

export default Lotto;
