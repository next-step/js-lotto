import { LottoNumber } from "./lotto-number.js";
import { LOTTO_RANK } from "./lotto-rank.js";
import { Lotto } from "./lotto.js";

export class LottoStore {
  #price;

  constructor(price = Lotto.PRICE) {
    if (price % Lotto.PRICE !== 0) {
      throw new RangeError(
        `구매 금액은 ${Lotto.PRICE}원 단위로 입력해야 합니다.`
      );
    }
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

  /**
   *
   * @param {Lotto} winningLotto
   * @param {LottoNumber} bonusNumber
   */
  validateBonusNumber(winningLotto, bonusNumber) {
    if (winningLotto.text().includes(bonusNumber.value)) {
      throw new RangeError("보너스 번호는 당첨 번호에 포함될 수 없습니다.");
    }
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
