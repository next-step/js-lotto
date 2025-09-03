import { LottoNumber } from "./lotto-number.js";
import { Lotto } from "./lotto.js";

export class LottoStore {
  #price;

  constructor(price = Lotto.PRICE) {
    this.#price = price;
  }

  sell() {
    const count = this.#price / Lotto.PRICE;
    const lottoList = [];
    for (let i = 0; i < count; i++) {
      lottoList.push(new Lotto(this.#generate()));
    }
    return lottoList;
  }

  #generate() {
    const numbers = new Set();

    while (numbers.size < Lotto.NUMBER_COUNT) {
      const number = Math.floor(Math.random() * LottoNumber.MAX_NUMBER) + 1;
      numbers.add(number);
    }

    return [...numbers].sort((a, b) => a - b);
  }
}
