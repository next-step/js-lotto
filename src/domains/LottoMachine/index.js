import { Lotto } from "../Lotto/index.js";
import { generateLottoNumbers } from "./utils/generateLottoNumbers.js";

export class LottoMachine {
  static BASE_LOTTO_PRICE = 1_000;

  #lottoPrice;

  constructor(lottoPrice) {
    this.#lottoPrice = lottoPrice;
  }

  issueLottos(price) {
    const lottoCount = Math.floor(price / this.#lottoPrice);

    return Array.from(
      { length: lottoCount },
      () => new Lotto(generateLottoNumbers())
    );
  }
}
