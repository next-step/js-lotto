import { LOTTO_GAME } from "../../constants/lottoGame";
import { Lotto } from "./lotto";

export class LottoGame {
  #purchasePrice;
  #lottos;
  #lotto;
  constructor(price) {
    this.#purchasePrice = price;
    this.#lottos = [];
    this.#lotto = new Lotto();
  }

  purchaseUnitLotto() {
    if (this.#purchasePrice >= LOTTO_GAME.UNIT_PRICE) {
      this.#purchasePrice -= LOTTO_GAME.UNIT_PRICE;
      this.#lottos.push(this.#lotto.generate());
    }
  }

  purchaseLottos() {
    while (this.#purchasePrice >= LOTTO_GAME.UNIT_PRICE) {
      this.purchaseUnitLotto();
    }
  }

  get result() {
    return this.#lottos;
  }
}
