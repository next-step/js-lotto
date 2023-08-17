import { ERROR_MESSAGE } from '../constants/message.js';
import LottoValidator from '../utils/validate/validator/LottoValidator.js';

/**
 * "수익율 계산"이라는 도메인에 대한 클래스
 */
export default class LottoCalculator {
  #winningAmount;

  #investmentAmount;

  constructor(winningAmount, investmentAmount) {
    this.#validate(winningAmount, investmentAmount);
    this.#winningAmount = winningAmount;
    this.#investmentAmount = investmentAmount;
  }

  /**
   * 총 당첨 금액, 로또 구매 금액이 숫자인지, 구매 금액이 0원이 아닌지 검증하는 메서드
   * @param {number} winningAmount - 총 당첨 금액
   * @param {number} investmentAmount - 로또 구매 금액
   */
  #validate(winningAmount, investmentAmount) {
    LottoValidator.validateTypeOfNumbers([winningAmount, investmentAmount]);
    if (investmentAmount === 0) {
      throw TypeError(ERROR_MESSAGE.INVALID_AMOUNT);
    }
  }

  /**
   * 수익율을 "%"형태로 포맷팅 하여 반환하는 메서드
   * @param {number} rateOfReturn - 수익율
   * @returns {string} 수익율의 형태로 포맷팅한 문자열
   */
  static #convertToRateOfReturn(rateOfReturn) {
    if (Number.isInteger(rateOfReturn)) return `${rateOfReturn}%`;
    return `${rateOfReturn.toFixed(1)}%`;
  }

  /**
   * 네이밍을 위한 정적 팩토리 메서드
   * @param {number} winningAmount  - 총 당첨 금액
   * @param {number} investmentAmount - 로또 구매 금액
   * @returns {LottoCalculator} LottoCalculator 인스턴스
   */
  static from(winningAmount, investmentAmount) {
    return new LottoCalculator(winningAmount, investmentAmount);
  }

  /**
   * Bank - LottoCalculator간 "수익율 계산"이라는 협력을 위해 수익율을 계산 후 "%"형태로 포맷팅하여 반환하는 메서드
   * @returns {string} 문자열로 포맷팅된 수익율
   */
  calculateRateOfReturn() {
    return LottoCalculator.#convertToRateOfReturn((this.#winningAmount / this.#investmentAmount) * 100);
  }
}
