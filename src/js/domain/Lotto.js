export class Lotto {
  #numbers;

  /**
   * @param {string[]} numbers
   */
  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
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
}
