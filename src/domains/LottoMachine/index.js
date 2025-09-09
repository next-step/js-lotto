import { Lotto } from "../Lotto/index.js";
import { generateLottoNumbers } from "./utils/generateLottoNumbers.js";

export class LottoMachine {
  #baseLottoPrice;

  constructor(lottoPrice) {
    this.#baseLottoPrice = lottoPrice;
  }

  issueLottos(price) {
    const lottoCount = Math.floor(price / this.#baseLottoPrice);

    const lottos = [];
    for (let i = 0; i < lottoCount; i++) {
      lottos.push(new Lotto(generateLottoNumbers()));
    }

    return lottos;
  }
}
