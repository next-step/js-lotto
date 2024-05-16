import { ErrorLottoNumbers } from "../constants/error";
import LottoNumber from "./LottoNumber";

class Lotto {
  static LOTTO_PRICE = 1000;
  static LENGTH_LOTTO_NUMBERS = 6;

  #numbers = [];

  constructor(input) {
    Lotto.validateLottoNumbers(input);
    const lottoNumbers = Lotto.convertLottoNumbersToArray(input);
    this.#numbers = lottoNumbers;
  }

  get numbers() {
    return [...this.#numbers];
  }

  static validateLottoNumbers(input) {
    if (!Array.isArray(input) && typeof input !== "string") {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_NOT_VALID_TYPE);
    }

    const lottoNumbers = Lotto.convertLottoNumbersToArray(input);
    const lottoNumbersSet = new Set(lottoNumbers);

    if (lottoNumbers.length !== this.LENGTH_LOTTO_NUMBERS) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_NOT_VALID_LENGTH);
    }

    if (lottoNumbers.length !== lottoNumbersSet.size) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED);
    }

    lottoNumbers.forEach((lottoNumber) => {
      LottoNumber.validateLottoNumber(lottoNumber);
    });
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

  static convertLottoNumbersToArray(lottoNumbers) {
    if (Array.isArray(lottoNumbers)) {
      return lottoNumbers.map(Number);
    }

    if (typeof lottoNumbers === "string") {
      return lottoNumbers.split(",").map(Number);
    }

    return [];
  }

  static sortLottoNumbersByAscendingOrder(lottoNumbers) {
    return [...lottoNumbers].sort((a, b) => a - b);
  }

  countMatchingLottoNumbers(lottoNumbers) {
    const matchedLottoNumbers = this.#numbers.filter((lottoNumber) =>
      lottoNumbers.includes(lottoNumber)
    );
    return matchedLottoNumbers.length;
  }

  hasLottoNumber(lottoNumber) {
    return this.#numbers.includes(lottoNumber);
  }
}

export default Lotto;
