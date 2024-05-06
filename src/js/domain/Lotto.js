import { COUNT_LOTTO_NUMBERS, LOTTO_PRICE } from "../../constants/lotto";

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
      const randomNumber = Math.floor(Math.random() * 45) + 1;

      if (!numbersSet.has(randomNumber)) {
        numbersSet.add(randomNumber);
        this.#numbers.push(randomNumber);
      }

      if (this.#numbers.length === COUNT_LOTTO_NUMBERS) {
        break;
      }
    }
  }
}

export default Lotto;
