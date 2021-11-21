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

  setLottos(lottos) {
    this.#lottos = [...this.#lottos, ...lottos];
    console.log(this.#lottos);
  }

  setManualLotto(lotto) {
    this.setLottos([lotto]);
  }

  setAutoLottos(price) {
    const lottoCount = price / PRICE_UNIT;
    const autoLottos = Array.from({ length: lottoCount }, () =>
      this.getRandomLottoNumbers()
    );
    this.#price = Number(price);
    this.setLottos(autoLottos);
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
