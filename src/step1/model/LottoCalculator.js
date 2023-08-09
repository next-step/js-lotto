export default class LottoCalculator {
  #winningAmount;

  #investmentAmount;

  constructor(winningAmount, investmentAmount) {
    this.#winningAmount = winningAmount;
    this.#investmentAmount = investmentAmount;
  }

  static #convertToRateOfReturn(rateOfReturn) {
    if (Number.isInteger(rateOfReturn)) return `${rateOfReturn}%`;
    return `${rateOfReturn.toFixed(1)}%`;
  }

  static fromLottoCalculator(winningAmount, investmentAmount) {
    return new LottoCalculator(winningAmount, investmentAmount);
  }

  calculateRateOfReturn() {
    return LottoCalculator.#convertToRateOfReturn((this.#winningAmount / this.#investmentAmount) * 100);
  }
}
