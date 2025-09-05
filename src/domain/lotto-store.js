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
    const numbers = Array.from(
      { length: LottoNumber.MAX_NUMBER },
      (_, number) => number + 1
    );
    this.#shuffle(numbers);
    return numbers.slice(0, Lotto.NUMBER_COUNT).sort((a, b) => a - b);
  }

  #shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
