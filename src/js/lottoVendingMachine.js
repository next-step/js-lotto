import { LOTTO_PRICE } from './constants/lotto.js';
import { Lotto } from './lotto.js';

export class LottoVendingMachine {
  static purchaseLotto(money) {
    return new Array(LottoVendingMachine.#getPurchaseLottoAmount(money))
      .fill()
      .map(() => new Lotto());
  }

  static #getPurchaseLottoAmount(money) {
    return Math.floor(money / LOTTO_PRICE);
  }
}
