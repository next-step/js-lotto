import {
  LENGTH_LOTTO_NUMBERS,
  LOTTO_PRICE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "../../constants/lotto";

class Lotto {
  #price = LOTTO_PRICE;
  #numbers = [];

  constructor() {
    this.generateLottoNumbers();
  }

  get price() {
    return this.#price;
  }

  get numbers() {
    return this.#numbers;
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
