import {
  DEFAULT_LOTTO_COUNT,
  DEFAULT_PRICE,
  LOTTO_PRICE,
  NUMBER_PATTERN,
} from '../const.js';

class Lotto {
  #price;
  #lottoCount;
  #lottery;

  constructor() {
    this.#price = DEFAULT_PRICE;
    this.#lottoCount = DEFAULT_LOTTO_COUNT;
    this.#lottery = [];
  }

  setPrice(nextPrice) {
    this.#price = nextPrice;
  }

  getPrice() {
    return this.#price;
  }

  getLottoCount() {
    return this.#lottoCount;
  }

  validatePrice() {
    if (NUMBER_PATTERN.test(this.#price)) {
      return true;
    }

    if (this.#price % LOTTO_PRICE === DEFAULT_PRICE) {
      return true;
    }

    if (this.#price > DEFAULT_PRICE) {
      return true;
    }

    return false;
  }

  registerLotto() {
    this.#lottoCount = this.#price / LOTTO_PRICE;

    /**
     * @todo add uniq random number login
     */
  }
}

export default Lotto;
