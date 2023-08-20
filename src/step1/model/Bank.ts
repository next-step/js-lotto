import { LottoMatchingInfo, WinningInfo, WinningLottoInfo } from '@step1/utils/jsDoc';
import BonusNumberValidator from '@step1/utils/validate/validator/BonusNumberValidator';
import { LottoCalculator, LottoReward } from '@step1/model';

/**
 * "로또 당첨 결과 및 수익률 계산"이라는 도메인을 갖는 클래스
 */
export default class Bank {
  /**
   * "당첨 로또 정보(당첨 로또 번호, 보너스 번호)"에 대한 private field
   * @type {WinningLottoInfo}
   */
  #winningLottoInfo: WinningLottoInfo;

  constructor({ winningLottoNumbers, bonusNumber }: WinningLottoInfo) {
    this.#validate({ winningLottoNumbers, bonusNumber });
    this.#winningLottoInfo = { winningLottoNumbers, bonusNumber };
  }

  /**
   * 네이밍을 위한 정적 팩토리 메서드
   * @param {number[]} winningLottoNumbers - 1등 당첨 번호
   * @param {number} bonusNumber - 보너스 번호
   * @returns {Bank} Bank 인스턴스 객체
   */
  static from(winningLottoNumbers: number[], bonusNumber: number): Bank {
    return new Bank({ winningLottoNumbers, bonusNumber });
  }

  /**
   * 보너스 번호가 숫자 타입인지, 당첨 로또 번호와 중복 되는 번호가 존재하는지, 1~45의 숫자 범위를 갖는지 검증하는 메서드
   * @param {WinningLottoInfo} WinningLottoInfo - 당첨 로또 번호와 보너스 번호에 대한 객체
   */
  #validate({ winningLottoNumbers, bonusNumber }: WinningLottoInfo) {
    BonusNumberValidator.validateDuplicateBonusNumber(winningLottoNumbers, bonusNumber);
    BonusNumberValidator.validateBonusNumberInRange(bonusNumber);
  }

  /**
   * 로또 번호 내 보너스 번호와 일치하는 번호가 있는지 확인하는 메서드
   * @param {number[]} lottoNumbers 로또 내 로또 번호들
   * @returns {boolean} 보너스 번호의 일치 여부에 대한 boolean 값
   */
  #hasBonusNumber(lottoNumbers: number[]): boolean {
    return lottoNumbers.includes(this.#winningLottoInfo.bonusNumber);
  }

  /**
   * 인덱스를 재귀를 통해 증가 시켜가며 로또 번호와 당첨 로또 번호가 일치하는지 확인 후 당첨 횟수를 반환하는 메서드
   * @param {number[]} lottoNumbers - 로또 내 로또 번호들
   * @param {number} index - 로또 번호와 당첨 로또의 번호를 비교하기 위한 인덱스
   * @returns {number} 당첨 횟수(winningCount)
   */
  #calculateWinningCount(lottoNumbers: number[], index: number = 0): number {
    if (index === lottoNumbers.length) return 0;
    const count = this.#winningLottoInfo.winningLottoNumbers[index] === lottoNumbers[index] ? 1 : 0;
    return count + this.#calculateWinningCount(lottoNumbers, index + 1);
  }

  /**
   * 당첨 횟수와 보너스 당첨 여부를 계산 후 로또 당첨 정보를 반환하는 메서드
   * @param {number[]} lottoNumbers - 로또 내 로또 번호들
   * @returns {LottoMatchingInfo} 로또 당첨 정보
   */
  #calculateLottoMatchingInfo(lottoNumbers: number[]): LottoMatchingInfo {
    const winningCount = this.#calculateWinningCount(lottoNumbers);
    const hasBonusNumber = this.#hasBonusNumber(lottoNumbers);
    return { winningCount, hasBonusNumber };
  }

  /**
   * controller - Bank 간 "로또 당첨 결과 및 수익률 계산"이라는 협력을 위한 메서드
   * @param {number[][]} lottoNumbers - 구매한 로또들 내 로또 번호
   * @param {number} investmentAmount - 로또 구매 비용(투자 비용)
   * @returns {WinningInfo} 당첨 정보(로또 당첨 결과 및 수익률)
   */
  calculateResults(lottoNumbers: number[][], investmentAmount: number): WinningInfo {
    const lottoMatchingInfo = lottoNumbers.map((lottoNumber) => this.#calculateLottoMatchingInfo(lottoNumber));
    const { lottoResult, winningAmount } = LottoReward.from(lottoMatchingInfo).calculateWinningInfo();
    const rateOfReturn = LottoCalculator.from(winningAmount, investmentAmount).calculateRateOfReturn();
    return { lottoResult, rateOfReturn };
  }
}
