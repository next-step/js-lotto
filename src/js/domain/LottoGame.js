import { LOTTO_GAME } from "../../constants/lottoGame";
import { Lotto } from "./lotto";

export class LottoGame {
  #purchasePrice;
  #lottos;
  #lotto;
  #winningNumbers;
  constructor(price) {
    this.#purchasePrice = price;
    this.#winningNumbers = [];
  }
}
