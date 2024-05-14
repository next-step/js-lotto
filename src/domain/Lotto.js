import { LOTTO } from "../constants/lotto";
import { generateRandomNumber } from "../utils/generateRandomNumber";

export class Lotto {
  #lottos;
  #purchasePrice;
  constructor(purchasePrice) {
    this.#lottos = [];
    this.#purchasePrice = purchasePrice;
    this.#purchaseLottos();
  }

  #generate() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < LOTTO.NUMBERS_COUNT) {
      lottoNumbers.add(generateRandomNumber(LOTTO.MAX_NUMBER));
    }

    return Array.from(lottoNumbers).sort((a, b) => a - b);
  }

  #purchaseUnitLotto() {
    if (this.#purchasePrice >= LOTTO.UNIT_PRICE) {
      this.#purchasePrice -= LOTTO.UNIT_PRICE;
      this.#lottos.push(this.#generate());
    }
  }

  #purchaseLottos() {
    while (this.#purchasePrice >= LOTTO.UNIT_PRICE) {
      this.#purchaseUnitLotto();
    }
  }

  get lottos() {
    return this.#lottos;
  }
}
