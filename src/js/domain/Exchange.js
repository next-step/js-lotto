export class Exchange {
  #multiple = 100;

  #rateOfReturnDigit = 1;

  static getTotalPrize(prizes) {
    return prizes.reduce((acc, { prize }) => acc + prize, 0);
  }

  calculateRateOfReturn(investment, proceeds) {
    return Number(((proceeds / investment) * this.#multiple).toFixed(this.#rateOfReturnDigit));
  }
}
