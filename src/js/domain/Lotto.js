import {
  ErrorLottoNumber,
  ErrorLottoNumbers,
  ErrorLottoPurchasedAmount,
} from "../../constants/error";

class Lotto {
  static LENGTH_LOTTO_NUMBERS = 6;
  static LOTTO_PRICE = 1000;
  static MAX_LOTTO_NUMBER = 45;
  static MIN_LOTTO_NUMBER = 1;

  #numbers = [];

  constructor(lottoNumbers) {
    try {
      Lotto.validateLottoNumbers(lottoNumbers);
      this.#numbers = Lotto.convertLottoNumbersToArray(lottoNumbers);
    } catch (e) {
      console.error(e);
    }
  }

  get numbers() {
    return [...this.#numbers];
  }

  static convertLottoNumbersToArray(lottoNumbers) {
    if (typeof lottoNumbers !== "string") {
      return lottoNumbers;
    }

    return lottoNumbers.split(",").map(Number);
  }

  static validateLottoPurchasedAmount(purchasedAmount) {
    if (isNaN(purchasedAmount)) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER
      );
    }

    if (Number(purchasedAmount) < 0) {
      throw new Error(
        ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_POSITIVE
      );
    }
  }

  static getAvailableLottoCount(purchasedAmount) {
    return Math.floor(purchasedAmount / Lotto.LOTTO_PRICE);
  }

  static generateLottoNumbers() {
    const lottoNumbers = [];
    const candidateLottoNumbers = Array.from(
      { length: Lotto.MAX_LOTTO_NUMBER },
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

  static validateLottoNumbers(input) {
    const lottoNumbers = Lotto.convertLottoNumbersToArray(input);
    if (lottoNumbers.length !== Lotto.LENGTH_LOTTO_NUMBERS) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_NOT_VALID_LENGTH);
    }
    lottoNumbers.forEach((lottoNumber) => {
      this.validateLottoNumber(lottoNumber);
    });
  }

  static validateLottoNumber(input) {
    if (isNaN(input)) {
      throw new Error(ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_NUMBER);
    }

    if (!Number.isInteger(Number(input))) {
      throw new Error(ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER);
    }

    if (Number(input) < 1 || Number(input) > 45) {
      throw new Error(ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER);
    }
  }
}

export default Lotto;
