import { LottoNumber } from "./LottoNumber.js";
import { LottoShop } from "./LottoShop.js";

export class WinningLotto {
  #lotto;

  #bonusNumber;

  constructor({ winningNumber, bonusNumber }) {
    this.#lotto = LottoShop.createLotto(winningNumber);
    this.#bonusNumber = LottoNumber.of(bonusNumber);
  }

  static of({ winningNumber, bonusNumber }) {
    return new WinningLotto({ winningNumber, bonusNumber });
  }

  get value() {
    return {
      lotto: this.#lotto,
      bonusNumber: this.#bonusNumber,
    };
  }
}
