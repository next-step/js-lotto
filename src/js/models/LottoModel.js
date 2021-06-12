import { LOTTO } from '../utils/constants.js';
import { getRandomNumber } from '../utils/utils.js';

export default class LottoModel {
  constructor() {
    this._lottos = [];
  }

  get lottos() {
    return this._lottos;
  }

  set lottos(money) {
    this._lottos = Array.from({ length: money / LOTTO.UNIT }, () => this.getLottoNumbers());
  }

  getLottoNumbers() {
    const lottoSet = new Set();

    while (lottoSet.size < LOTTO.COUNTS) {
      lottoSet.add(getRandomNumber(LOTTO.MIN_VALUE, LOTTO.MAX_VALUE));
    }
    return lottoSet;
  }
}
