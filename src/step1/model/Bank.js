import { LottoCalculator, LottoReward } from './index.js';

export default class Bank {
  #winningLottoInfo;

  constructor({ winningLotto, bounsNumber }) {
    this.#winningLottoInfo = { winningLotto, bounsNumber };
  }

  static fromBank(winningLotto, bounsNumber) {
    return new Bank({ winningLotto, bounsNumber });
  }

  #isBonusNumber(lottoNumbers) {
    return new Set(lottoNumbers).has(this.#winningLottoInfo.bounsNumber);
  }

  #isWinningLottoNumber(lottoNumber) {
    return new Set(this.#winningLottoInfo.winningLotto).has(lottoNumber);
  }

  #calculateWinningCount(lottoNumbers) {
    return lottoNumbers.reduce((count, lottoNumber) => count + (this.#isWinningLottoNumber(lottoNumber) ? 1 : 0), 0);
  }

  #calculateLottoResult(lottoNumbers) {
    const winningCount = this.#calculateWinningCount(lottoNumbers);
    const bonusNumberStatus = this.#isBonusNumber(lottoNumbers);
    return [winningCount, bonusNumberStatus];
  }

  calculateResults(lottoNumbers, investmentAmount) {
    const lottoResults = lottoNumbers.map((lottoNumber) => this.#calculateLottoResult(lottoNumber));
    const { lottoResult, winningAmount } = LottoReward.fromLottoReward(lottoResults).calculateWinningInfo();
    const rateOfReturn = LottoCalculator.fromLottoCalculator(winningAmount, investmentAmount).calculateRateOfReturn();
    return { lottoResult, rateOfReturn };
  }
}
