import {
  LOTTO_MAX_NUM,
  LOTTO_MAX_SIZE,
  LOTTO_MIN_NUM,
} from './constants/lotto.js';

export class Lotto {
  #values;

  constructor() {
    this.#values = new Set();

    while (true) {
      this.#values.add(Lotto.#getRandomNumber());

      if (Lotto.#isMaxCreateLottoNumber(this.#values)) {
        break;
      }
    }
  }

  get value() {
    return [...this.#values].toString();
  }

  static #isMaxCreateLottoNumber(values) {
    return values.size >= LOTTO_MAX_SIZE;
  }

  static #getRandomNumber() {
    return Math.floor(
      Math.random() * (LOTTO_MAX_NUM - LOTTO_MIN_NUM + 1) + LOTTO_MIN_NUM
    );
  }
}
