import {
  LOTTO_PRICE_UNIT,
  LOTTO_PRICE_UNIT_NOT_MATCH_MESSAGE,
  LOTTO_NUMBER_RANGE,
  LOTTO_NUMBER_COUNT,
} from './constants.js';
import { shuffleArray } from './utils.js';

class Lotto {
  /** @type {[number[]]} */
  data = [];

  /**
   * @param {number} price
   */
  buy(price) {
    const lottoBuyLength = price / LOTTO_PRICE_UNIT;

    if (price % LOTTO_PRICE_UNIT !== 0) {
      alert(LOTTO_PRICE_UNIT_NOT_MATCH_MESSAGE);
      return;
    }

    for (let i = 0; i < lottoBuyLength; i += 1) {
      this.data.push(this.create());
    }
  }

  create() {
    const lotto = [];
    const lottoRange = [...new Array(LOTTO_NUMBER_RANGE)].map((_, index) => index + 1);

    shuffleArray(lottoRange);

    for (let i = 0; i < LOTTO_NUMBER_COUNT; i += 1) {
      lotto.push(lottoRange.splice(0, 1)[0]);
    }

    return lotto;
  }

  init() {
    this.data = [];
  }
}

export default Lotto;
