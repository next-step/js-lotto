import { LOTTO_PRICE } from './constants/lotto.js';
import { Lotto } from './lotto.js';

export class LottoVendingMachine {
  static purchaseLotto(money) {
    return new Array(LottoVendingMachine.#getPurchaseLottoAmount(money))
      .fill()
      .map(() => new Lotto());
  }

  static #getPurchaseLottoAmount(value) {
    return Math.floor(value / LOTTO_PRICE);
  }
}
