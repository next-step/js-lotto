import { LOTTO_INFO } from '../constants/constants.js';
import { getRandomNumber } from '../utils/utils.js';

const { PRICE_UNIT, LOTTO_COUNT, MIN, MAX } = LOTTO_INFO;

export default class LottoModel {
  #lottos;
  #price;

  constructor() {
    this.#price = 0;
    this.#lottos = [];
  }

  get lottos() {
    return this.#lottos;
  }

  setAutoLottos(price) {
    const lottoCount = price / PRICE_UNIT;
    const autoLottos = Array.from({ length: lottoCount }, () =>
      this.getRandomLottoNumbers()
    );
    this.#lottos = autoLottos;
  }

  get price() {
    return this.#price;
  }

  setPrice(price) {
    this.#price = price;
  }

  getRandomLottoNumbers() {
    const lotto = new Set();

    while (lotto.size < LOTTO_COUNT) {
      lotto.add(getRandomNumber(MIN, MAX));
    }

    return [...lotto];
  }
}
