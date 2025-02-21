class Budget {
  constructor(amount) {
    this.amount = amount;
    this.totalWinningAmount = 0;
  }

  getLottoCount(lottoPrice) {
    return Math.floor(this.amount / lottoPrice);
  }

  addTotalWinningAmount(winningAmount) {
    this.totalWinningAmount += winningAmount;
  }

  getProfit() {
    return ((this.totalWinningAmount / this.amount) * 100).toFixed(1);
  }
}

export default Budget;
