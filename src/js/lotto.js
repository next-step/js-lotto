import {
  DEFAULT_LOTTO_COUNT,
  DEFAULT_PRICE,
  ERROR_MESSAGE,
  LOTTO_COUNT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_PRICE,
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

  get lottoCount() {
    return this.#lottoCount;
  }

  get lottos() {
    return this.#lottos;
  }

  validatePrice = () => {
    if (this.#price % LOTTO_PRICE > DEFAULT_PRICE) {
      window.alert(ERROR_MESSAGE.INVALID_UNIT_NUMBER);
      return false;
    }

    if (this.#price <= DEFAULT_PRICE) {
      window.alert(ERROR_MESSAGE.INVALID_NEGATIVE_NUMBER);
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
    const uniqRandomNumbers = new Set();

    while (uniqRandomNumbers.size < LOTTO_COUNT) {
      const randomNumber = getRandomNumber(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER);
      uniqRandomNumbers.add(randomNumber);
    }

    return Array.from(uniqRandomNumbers);
  }
}

export default Lotto;
