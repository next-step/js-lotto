import generateRandomNumber from "../../utils/generateRandomNumber.js";

import LOTTO from "./lotto.constant.js";

class Lotto {
  #numbers;

  constructor() {
    this.#numbers = this.#generateNumbers();
  }

  #generateNumbers() {
    const numbers = new Set();

    while (numbers.size < LOTTO.COUNT_OF_NUMBERS) {
      numbers.add(generateRandomNumber(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER));
    }

    return Array.from(numbers).sort((a, b) => a - b);
  }

  get numbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
