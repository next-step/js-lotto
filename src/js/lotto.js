import {
  DEFAULT_LOTTO_COUNT,
  DEFAULT_PRICE,
  LOTTO_COUNT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_PRICE,
  NUMBER_PATTERN,
} from '../const.js';
import { getRandomNumber } from '../utils.js';

class Lotto {
  #price;
  #lottoCount;
  #lotto;

  constructor() {
    this.#price = DEFAULT_PRICE;
    this.#lottoCount = DEFAULT_LOTTO_COUNT;
    this.#lotto = [];
  }

  setPrice(nextPrice) {
    this.#price = nextPrice;
    this.#lottoCount = Math.floor(this.#price / LOTTO_PRICE);
  }

  getPrice() {
    return this.#price;
  }

  getLottoCount() {
    return this.#lottoCount;
  }

  getLotto() {
    return this.#lotto;
  }

  validatePrice() {
    if (NUMBER_PATTERN.test(this.#price) === false) {
      return false;
    }

    if (this.#price % LOTTO_PRICE > DEFAULT_PRICE) {
      return false;
    }

    if (this.#price < DEFAULT_PRICE) {
      return false;
    }

    return true;
  }

  registerLotto() {
    for (let i = 0; i < this.#lottoCount; i++) {
      this.#lotto.push(this.#getUniqRandomNumbers());
    }
  }

  #getUniqRandomNumbers() {
    const uniqRandomNumbers = [];
    let finishCount = 0;

    while (finishCount < LOTTO_COUNT) {
      const randomNumber = getRandomNumber(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER);
      if (uniqRandomNumbers.indexOf(randomNumber) < 0) {
        finishCount++;
        uniqRandomNumbers.push(randomNumber);
      }
    }
    return uniqRandomNumbers;
  }
}

export default Lotto;
