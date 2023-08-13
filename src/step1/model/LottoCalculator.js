import { ERROR_MESSAGE } from '../constants/message.js';
import LottoValidator from '../utils/validate/validator/LottoValidator.js';

export default class LottoCalculator {
  #winningAmount;

  #investmentAmount;

  constructor(winningAmount, investmentAmount) {
    this.#validate(winningAmount, investmentAmount);
    this.#winningAmount = winningAmount;
    this.#investmentAmount = investmentAmount;
  }

  #validate(winningAmount, investmentAmount) {
    LottoValidator.validateTypeOfNumbers([winningAmount, investmentAmount]);
    if (investmentAmount === 0) {
      throw TypeError(ERROR_MESSAGE.INVALID_AMOUNT);
    }
  }

  static #convertToRateOfReturn(rateOfReturn) {
    if (Number.isInteger(rateOfReturn)) return `${rateOfReturn}%`;
    return `${rateOfReturn.toFixed(1)}%`;
  }

  static from(winningAmount, investmentAmount) {
    return new LottoCalculator(winningAmount, investmentAmount);
  }

  calculateRateOfReturn() {
    return LottoCalculator.#convertToRateOfReturn((this.#winningAmount / this.#investmentAmount) * 100);
  }
}
