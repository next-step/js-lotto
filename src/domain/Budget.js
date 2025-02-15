class Budget {
  constructor(amount) {
    this.amount = amount;
  }

  getLottoCount(lottoPrice) {
    return Math.floor(this.amount / lottoPrice);
  }
}

export default Budget;
