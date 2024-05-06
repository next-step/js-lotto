class LottoResult {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = [...winningNumbers];
    this.#bonusNumber = bonusNumber;
  }

  countMatchingWinningNumbers(numbers) {
    const matchedWinningNumbers = this.#winningNumbers.filter((winningNumber) =>
      numbers.includes(winningNumber)
    );
    return matchedWinningNumbers.length;
  }

  getIsBonusNumberMatching(numbers) {
    return numbers.includes(this.#bonusNumber);
  }
}

export default LottoResult;
