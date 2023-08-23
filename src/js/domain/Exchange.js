import { LOTTO_REWARD } from '../constants/lotto-config.js';

export class Exchange {
  #multiple = 100;

  #rateOfReturnDigit = 1;

  static getTotalPrize(prizes) {
    return prizes.reduce((acc, prize) => acc + prize.getPrize(), 0);
  }

  calculateRateOfReturn(investment, proceeds) {
    return Number(((proceeds / investment) * this.#multiple).toFixed(this.#rateOfReturnDigit));
  }
}
