import { ErrorLottoPurchasedAmount } from "../../constants/error";
import {
  LENGTH_LOTTO_NUMBERS,
  LOTTO_PRICE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "../../constants/lotto";

class Lotto {
  static price = LOTTO_PRICE;
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
    const availableLottoCount = Math.floor(purchasedAmount / Lotto.price);
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
        Math.floor(Math.random() * MAX_LOTTO_NUMBER) + MIN_LOTTO_NUMBER;

      if (!numbersSet.has(randomNumber)) {
        numbersSet.add(randomNumber);
        this.#numbers.push(randomNumber);
      }

      if (this.#numbers.length === LENGTH_LOTTO_NUMBERS) {
        break;
      }
    }
  }
}

export default Lotto;
