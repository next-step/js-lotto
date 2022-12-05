class LottoMachine {
  constructor() {
    this.clear();
  }

  clear() {
    this.purchasePrice = 0;
    this.winningNumbers = [];
  }

  getPurchasePrice() {
    return this.purchasePrice;
  }

  setPurchasePrice(purchasePrice) {
    this.purchasePrice = purchasePrice;
  }

  getWinningNumbers() {
    return this.winningNumbers;
  }

  setWinningNumbers(winningNumbers) {
    this.winningNumbers = winningNumbers;
  }
}

export default LottoMachine;
