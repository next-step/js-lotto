class LottoResult {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = [...winningNumbers];
    this.#bonusNumber = bonusNumber;
  }

  countMatchingWinningNumbers(lottoNumbers) {
    const matchedWinningNumbers = this.#winningNumbers.filter((winningNumber) =>
      lottoNumbers.includes(winningNumber)
    );
    return matchedWinningNumbers.length;
  }

  isBonusNumberMatching(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusNumber);
  }

  getLottoRanking(lottoNumbers) {
    const matchingCount = this.countMatchingWinningNumbers(lottoNumbers);
    const isBonusNumberMatching = this.isBonusNumberMatching(lottoNumbers);

    switch (matchingCount) {
      case 6:
        return 1;
      case 5:
        return isBonusNumberMatching ? 2 : 3;
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return -1;
    }
  }
}

export default LottoResult;
