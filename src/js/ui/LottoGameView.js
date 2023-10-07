class LottoGameView {
  async getPurchaseAmount() {
    throw new Error('This method must be overridden')
  }

  async getLottoWinningNumbers() {
    throw new Error('This method must be overridden')
  }

  async getRestart() {
    throw new Error('This method must be overridden')
  }

  printPurchasedLottos() {
    throw new Error('This method must be overridden')
  }

  printResult() {
    throw new Error('This method must be overridden')
  }

  print() {
    throw new Error('This method must be overridden')
  }
}

export default LottoGameView
