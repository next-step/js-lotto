import Lotto from './Lotto';

export default class LottoMerchant {
  #lotto;

  constructor() {
    this.#lotto = new Lotto();
  }

  sellLotto(amount) {
    return this.#lotto.createLotto();
  }
}
