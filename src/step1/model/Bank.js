import BonusNumberValidator from '../utils/validate/validator/BonusNumberValidator.js';
import { LottoCalculator, LottoReward } from './index.js';

export default class Bank {
  #winningLottoInfo;

  constructor({ winningLottoNumbers, bonusNumber }) {
    this.#validate(winningLottoNumbers, bonusNumber);
    this.#winningLottoInfo = { winningLottoNumbers, bonusNumber };
  }

  #validate(winningLottoNumbers, bonusNumber) {
    BonusNumberValidator.validateBonusNumberType(bonusNumber);
    BonusNumberValidator.validateDuplicateBonusNumber(winningLottoNumbers, bonusNumber);
    BonusNumberValidator.validateBonusNumberInRange(bonusNumber);
  }

  static fromBank(winningLottoNumbers, bonusNumber) {
    return new Bank({ winningLottoNumbers, bonusNumber });
  }

  #hasBonusNumber(lottoNumbers) {
    return new Set(lottoNumbers).has(this.#winningLottoInfo.bonusNumber);
  }

  #calculateWinningCount(lottoNumbers, index = 0) {
    if (index === lottoNumbers.length) return 0;
    const count = this.#winningLottoInfo.winningLottoNumbers[index] === lottoNumbers[index] ? 1 : 0;
    return count + this.#calculateWinningCount(lottoNumbers, index + 1);
  }

  #calculateLottoResult(lottoNumbers) {
    const winningCount = this.#calculateWinningCount(lottoNumbers);
    const bonusNumberStatus = this.#hasBonusNumber(lottoNumbers);
    return [winningCount, bonusNumberStatus];
  }

  calculateResults(lottoNumbers, investmentAmount) {
    const lottoResults = lottoNumbers.map((lottoNumber) => this.#calculateLottoResult(lottoNumber));
    const { lottoResult, winningAmount } = LottoReward.fromLottoReward(lottoResults).calculateWinningInfo();
    const rateOfReturn = LottoCalculator.fromLottoCalculator(winningAmount, investmentAmount).calculateRateOfReturn();
    return { lottoResult, rateOfReturn };
  }
}
