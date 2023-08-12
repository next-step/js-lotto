import { LottoCalculator, LottoReward } from './index.js';

export default class Bank {
  #winningLottoInfo;

  constructor({ winningLottoNumbers, bonusNumber }) {
    this.#winningLottoInfo = { winningLottoNumbers, bonusNumber };
  }

  static fromBank(winningLottoNumbers, bonusNumber) {
    return new Bank({ winningLottoNumbers, bonusNumber });
  }

  #hasBonusNumber(lottoNumbers) {
    return new Set(lottoNumbers).has(this.#winningLottoInfo.bonusNumber);
  }

  #isWinningLottoNumber(lottoNumber) {
    return new Set(this.#winningLottoInfo.winningLottoNumbers).has(lottoNumber);
  }

  #calculateWinningCount(lottoNumbers) {
    return lottoNumbers.reduce((count, lottoNumber) => count + (this.#isWinningLottoNumber(lottoNumber) ? 1 : 0), 0);
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
