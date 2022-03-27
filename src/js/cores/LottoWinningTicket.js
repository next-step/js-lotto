export class LottoWinningTicket {
  winningNumbers;

  constructor(winningNumbers) {
    this.winningNumbers = winningNumbers;
  }

  getWinningNumbers() {
    return [...this.winningNumbers];
  }
}
