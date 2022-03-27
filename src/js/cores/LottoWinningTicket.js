export class LottoWinningTicket {
  winningNumbers;
  bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
  }

  getWinningNumbers() {
    return [...this.winningNumbers];
  }

  getBonusNumber() {
    return this.bonusNumber;
  }
}
