class Budget {
  static INVALID_AMOUNT = "올바른 금액을 입력해주세요.";
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

  static createBudget(budgetPrice) {
    if (!budgetPrice) {
      throw new Error(Budget.INVALID_AMOUNT);
    }
    const amount = Number(budgetPrice);
    if (Number.isNaN(amount)) {
      throw new Error(Budget.INVALID_AMOUNT);
    }
    return new Budget(amount);
  }
}

export default Budget;
