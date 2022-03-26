class WinningLotto {
  // todo : 당첨 번호 6개와 보너스 번호 1개
  #winningNumbers;

  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  set winningNumbers(newWinningNumbers) {
    this.#winningNumbers = newWinningNumbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  set bonusNumber(newBonusNumber) {
    this.#bonusNumber = newBonusNumber;
  }
}
