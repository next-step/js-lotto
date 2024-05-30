// import { bonusNumberRule, lottoRule } from "../rules/Lotto.rule.js";
import { LottoRank } from "./LottoRank.js";
import { LottoValidator, WinningLottoValidator } from "./LottoValidator.js";
export class Lotto {
  #numbers;
  #lottoValidator = new LottoValidator();
  /**
   * @param {string[]} numbers
   */
  constructor(numbers) {
    if (this.#lottoValidator.validates(numbers)) this.#numbers = numbers.sort((a, b) => a - b);
  }

  get numbers() {
    return [...this.#numbers];
  }
}

export class WinningLotto {
  #winningNumbers;
  #bonusNumber;
  #winningLottoValidator = new WinningLottoValidator();
  /**
   * @param {Lotto} winningLotto
   * @param {number} bonusNumber
   */
  constructor(winningLotto, bonusNumber) {
    if (this.#winningLottoValidator.validates(winningLotto, bonusNumber)) {
      this.#winningNumbers = winningLotto;
      this.#bonusNumber = bonusNumber;
    }
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

    const bonusMatched = lotto.numbers.includes(this.#bonusNumber);

    return LottoRank.getRank(matchedCount, bonusMatched);
  }
}
