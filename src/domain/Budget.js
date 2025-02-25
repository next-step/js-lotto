class Budget {
  static INVALID_AMOUNT = "올바른 금액을 입력해주세요.";

  constructor(budgetAmount) {
    const amount = Number(budgetAmount);
    if (!amount || Number.isNaN(amount) || amount < 0) {
      throw new Error(Budget.INVALID_AMOUNT);
    }
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
