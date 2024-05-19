import { LottoRank } from "./LottoRank.js";
export class Lotto {
  #numbers;

  /**
   * @param {string[]} numbers
   */
  constructor(numbers) {
    this.#numbers = numbers;
  }

  get numbers() {
    return [...this.#numbers];
  }
}

export class WinningLotto {
  #winningNumbers;
  #bonusNumber;
  /**
   * @param {Lotto} winningLotto
   * @param {number} bonusNumber
   */
  constructor(winningLotto, bonusNumber) {
    this.#winningNumbers = winningLotto;
    this.#bonusNumber = bonusNumber;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  getRank(lotto) {
    const matchedCount = lotto.numbers.filter((number) =>
      this.#winningNumbers.numbers.includes(number)
    ).length;

    const isBonusMatched = lotto.numbers.includes(this.#bonusNumber);

    return LottoRank.getRank(matchedCount, isBonusMatched);
  }
}
