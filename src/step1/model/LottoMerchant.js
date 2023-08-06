import { PRICE_PER_LOTTO } from '../constants/lotto.js';
import Lotto from './Lotto.js';

export default class LottoMerchant {
  #lotto;

  constructor() {
    this.#lotto = new Lotto();
  }

  #createLottoGenerationCycle(amount) {
    return Math.floor(amount / PRICE_PER_LOTTO);
  }

  sellLotto(amount) {
    return this.#lotto.createLotto(this.#createLottoGenerationCycle(amount));
  }
}
