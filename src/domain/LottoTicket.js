import {
  LOTTO_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "./constants.js";
import { createUniqueNumbers, getRandomNumber } from "./utils.js";

class LottoTicket {
  #numbers = [];

  constructor() {
    this.#numbers = this.#createUniqueNumbers().sort((a, b) => a - b);
  }

  get numbers() {
    return this.#numbers;
  }

  #createUniqueNumbers() {
    return createUniqueNumbers(LOTTO_NUMBER_COUNT, () =>
      getRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER)
    );
  }
}

export default LottoTicket;
