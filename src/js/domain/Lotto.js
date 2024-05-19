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

  getRank(winningLotto) {
    const winningNumbers = winningLotto.winningNumbers.numbers;
    const bonusNumber = winningLotto.bonusNumber;

    const matchedCount = this.#numbers.filter((number) => winningNumbers.includes(number)).length;
    const isBonusMatched = this.#numbers.includes(bonusNumber);

    return LottoRank.getRank(matchedCount, isBonusMatched);
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
}
