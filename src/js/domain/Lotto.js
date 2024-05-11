import { ErrorLottoPurchasedAmount } from "../../constants/error";

class Lotto {
  static LENGTH_LOTTO_NUMBERS = 6;
  static LOTTO_PRICE = 1000;
  static MAX_LOTTO_NUMBER = 45;
  static MIN_LOTTO_NUMBER = 1;

  #numbers = [];

  constructor(lottoNumbers) {
    this.#numbers = Lotto.convertLottoNumbersToArray(lottoNumbers);
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
}

export default Lotto;
