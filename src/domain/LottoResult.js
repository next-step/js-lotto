class LottoResult {
  constructor(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
  }

  getWinnersNumber() {
    return {
      winningNumbers: this.winningNumbers,
      bonusNumber: this.bonusNumber,
    };
  }
}

export default LottoResult;
