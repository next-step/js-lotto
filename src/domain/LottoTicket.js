import {
  LOTTO_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "./constants.js";
import { getRandomNumber } from "./utils.js";

class LottoTicket {
  #numbers = [];

  constructor() {
    this.#numbers = this.#createUniqueNumbers().sort((a, b) => a - b);
  }

  get numbers() {
    return this.#numbers;
  }

  #createUniqueNumbers() {
    const numbers = new Set();
    while (numbers.size < LOTTO_NUMBER_COUNT) {
      numbers.add(getRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER));
    }
    return [...numbers];
  }
}

export default LottoTicket;
