import { LottoNumber } from "./lotto-number.js";
import { findLottoRank, LottoRank } from "./lotto-rank.js";

export class Lotto {
  static PRICE = 1_000;
  static NUMBER_COUNT = 6;

  /** @type {LottoNumber[]} */
  #value;
  get lotto() {
    return this.#value;
  }

  constructor(numbers) {
    if (
      !Array.isArray(numbers) ||
      numbers.every((value) => typeof value !== "number")
    ) {
      throw new TypeError("numbers는 숫자 형식의 배열이어야 합니다.");
    }
    if (numbers.length !== Lotto.NUMBER_COUNT) {
      throw new RangeError("Lotto는 6개의 숫자로 구성되어야 합니다");
    }
    this.#value = numbers.map((number) => new LottoNumber(number));
  }

  text() {
    return this.#value.map((lottoNumber) => lottoNumber.value);
  }

  /**
   *
   * @param {number[]} winningNumbers
   * @param {number} bonusNumber
   */
  prize(winningNumbers, bonusNumber) {
    const match = this.#value.filter((lottoNumber) =>
      winningNumbers.includes(lottoNumber.value)
    ).length;
    const hasBonus =
      this.#value.filter((lottoNumber) => lottoNumber.value === bonusNumber)
        .length === 1;

    return findLottoRank(match, hasBonus);
  }
}
