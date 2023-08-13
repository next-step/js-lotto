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

  static from(winningLottoNumbers, bonusNumber) {
    return new Bank({ winningLottoNumbers, bonusNumber });
  }

  #hasBonusNumber(lottoNumbers) {
    return lottoNumbers.includes(this.#winningLottoInfo.bonusNumber);
  }

  #calculateWinningCount(lottoNumbers, index = 0) {
    if (index === lottoNumbers.length) return 0;
    const count = this.#winningLottoInfo.winningLottoNumbers[index] === lottoNumbers[index] ? 1 : 0;
    return count + this.#calculateWinningCount(lottoNumbers, index + 1);
  }

  #getLottoMatchingInfo(lottoNumbers) {
    const winningCount = this.#calculateWinningCount(lottoNumbers);
    const hasBonusNumber = this.#hasBonusNumber(lottoNumbers);
    return { winningCount, hasBonusNumber };
  }

  calculateResults(lottoNumbers, investmentAmount) {
    const lottoMatchingInfo = lottoNumbers.map((lottoNumber) => this.#getLottoMatchingInfo(lottoNumber));
    const { lottoResult, winningAmount } = LottoReward.fromLottoReward(lottoMatchingInfo).calculateWinningInfo();
    const rateOfReturn = LottoCalculator.from(winningAmount, investmentAmount).calculateRateOfReturn();
    return { lottoResult, rateOfReturn };
  }
}
