class LottoResult {
  #winningNumbers;

  constructor(winningNumbers) {
    this.#winningNumbers = [...winningNumbers];
  }

  countMatchingWinningNumbers(numbers) {
    const matchedWinningNumbers = this.#winningNumbers.filter((winningNumber) =>
      numbers.includes(winningNumber)
    );
    return matchedWinningNumbers.length;
  }
}

export default LottoResult;
