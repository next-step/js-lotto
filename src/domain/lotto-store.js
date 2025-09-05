import { LottoNumber } from "./lotto-number.js";
import { LOTTO_RANK } from "./lotto-rank.js";
import { Lotto } from "./lotto.js";

export class LottoStore {
  #price;

  constructor(price = Lotto.PRICE) {
    this.#price = price;
  }

  sell() {
    const count = this.#price / Lotto.PRICE;
    return Array.from({ length: count }, () => new Lotto(this.#generate()));
  }

  /**
   *
   * @param {LOTTO_RANK[]} rankList
   */
  rateOfReturn(rankList) {
    const totalPrize = rankList
      .map((rank) => rank.prize)
      .reduce((acc, prize) => acc + prize);

    return Math.floor((totalPrize / this.#price) * 100.0) / 100.0;
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
