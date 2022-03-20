import { LOTTO_PRICE_UNIT, LOTTO_PRICE_UNIT_NOT_MATCH_MESSAGE } from './constants.js';

class Lotto {
  lottos = [];

  /**
   * @param {number} price
   */
  // eslint-disable-next-line class-methods-use-this
  buy(price) {
    if (price % LOTTO_PRICE_UNIT !== 0) {
      alert(LOTTO_PRICE_UNIT_NOT_MATCH_MESSAGE);
    }
  }
}

export default Lotto;
