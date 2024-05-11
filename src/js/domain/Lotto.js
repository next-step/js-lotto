import { ErrorLottoPurchasedAmount } from "../../constants/error";

class Lotto {
  static LENGTH_LOTTO_NUMBERS = 6;
  static LOTTO_PRICE = 1000;
  static MAX_LOTTO_NUMBER = 45;
  static MIN_LOTTO_NUMBER = 1;

  #numbers = [];

  constructor() {
    this.generateLottoNumbers();
  }

  get numbers() {
    return [...this.#numbers];
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

  static generateLottos(purchasedAmount) {
    const availableLottoCount = Math.floor(purchasedAmount / Lotto.LOTTO_PRICE);
    const generatedLottos = [];

    for (let i = 0; i < availableLottoCount; i++) {
      generatedLottos.push(new Lotto());
    }

    return generatedLottos;
  }

  generateLottoNumbers() {
    const numbersSet = new Set();

    while (true) {
      const randomNumber =
        Math.floor(Math.random() * Lotto.MAX_LOTTO_NUMBER) +
        Lotto.MIN_LOTTO_NUMBER;

      if (!numbersSet.has(randomNumber)) {
        numbersSet.add(randomNumber);
        this.#numbers.push(randomNumber);
      }

      if (this.#numbers.length === Lotto.LENGTH_LOTTO_NUMBERS) {
        break;
      }
    }
  }
}

export default Lotto;
