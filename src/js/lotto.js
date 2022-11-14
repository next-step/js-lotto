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
  #lottos;

  constructor() {
    this.#price = DEFAULT_PRICE;
    this.#lottoCount = DEFAULT_LOTTO_COUNT;
    this.#lottos = [];
  }

  setPrice = (nextPrice) => {
    this.#price = nextPrice;
  };

  getPrice = () => {
    return this.#price;
  };

  getLottoCount = () => {
    return this.#lottoCount;
  };

  getLottos = () => {
    return this.#lottos;
  };

  validatePrice = () => {
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
  };

  registerLotto = () => {
    this.#lottoCount = Math.floor(this.#price / LOTTO_PRICE);
    this.#lottos = [];

    for (let i = 0; i < this.#lottoCount; i++) {
      this.#lottos.push(this.#getUniqRandomNumbers());
    }
  };

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
