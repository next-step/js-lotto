import { formatWithSuffix } from '../utils/string';
import NumberValidator from '../utils/validate/validator/NumberValidator';
import { SYMBOLS } from '../constants/commons';
/**
 * "수익율 계산"이라는 도메인에 대한 클래스
 */
export default class LottoCalculator {
  #winningAmount: number;

  #investmentAmount: number;

  constructor(winningAmount: number, investmentAmount: number) {
    this.#validate(investmentAmount);
    this.#winningAmount = winningAmount;
    this.#investmentAmount = investmentAmount;
  }

  /**
   * 네이밍을 위한 정적 팩토리 메서드
   * @param {number} winningAmount  - 총 당첨 금액
   * @param {number} investmentAmount - 로또 구매 금액
   * @returns {LottoCalculator} LottoCalculator 인스턴스
   */
  static from(winningAmount: number, investmentAmount: number): LottoCalculator {
    return new LottoCalculator(winningAmount, investmentAmount);
  }

  /**
   * 구매 금액이 0원이 아닌지 검증하는 메서드
   * @param {number} investmentAmount - 로또 구매 금액
   */
  #validate(investmentAmount: number) {
    NumberValidator.validateZero(investmentAmount);
  }

  /**
   * Bank - LottoCalculator간 "수익율 계산"이라는 협력을 위해 수익율을 계산 후 "%"형태로 포맷팅하여 반환하는 메서드
   * @returns {string} 문자열로 포맷팅된 수익율
   */
  calculateRateOfReturn(): string {
    const rateOfReturn = (this.#winningAmount / this.#investmentAmount) * 100;
    if (Number.isInteger(rateOfReturn)) return formatWithSuffix(rateOfReturn, SYMBOLS.PERCENT);
    return formatWithSuffix(rateOfReturn.toFixed(1), SYMBOLS.PERCENT);
  }
}
