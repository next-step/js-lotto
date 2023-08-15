import { LOTTO_REWARD_CONDITION } from '../constants/lotto-config.js';

class Exchange {
  #multiple = 100;

  #rateOfReturnDigit = 1;

  static getLottoPrize(result) {
    return Object.keys(result).reduce((acc, code) => {
      const reward = result[code] ? LOTTO_REWARD_CONDITION[code].prize : 0;
      return acc + reward;
    }, 0);
  }

  calculateRateOfReturn(investment, proceeds) {
    return ((proceeds / investment) * this.#multiple).toFixed(this.#rateOfReturnDigit);
  }
}

export default Exchange;
