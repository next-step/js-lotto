import Lotto from './Lotto.js';
import { LOTTO_NUMBERS } from '../utils/constants.js';

export default class LottoTicket {
  constructor() {
    this.lottos = [];
    this.rankCounts = [];
    this.earningRate = 0;
  }

  get lottos() {
    return this._lottos;
  }

  set lottos(inputPrice) {
    const count = inputPrice / LOTTO_NUMBERS.LOTTO_UNIT;

    this._lottos = Array.from({ length: count }, () => {
      const lotto = new Lotto();
      return lotto;
    });
  }

  get rankCounts() {
    return this._rankCounts;
  }

  set rankCounts(currentRankCounts) {
    this._rankCounts = currentRankCounts;
  }

  get earningRate() {
    return this._earningRate;
  }

  set earningRate(currentEarningRate) {
    this._earningRate = currentEarningRate;
  }
}
