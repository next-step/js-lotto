class LottoCalculator {
  #winningLottoNumber = [];
  #bonusNumber = 0;

  constructor(winningLottoNumber, bonusNumber) {
    this.#winningLottoNumber = winningLottoNumber;
    this.#bonusNumber = bonusNumber;
  }

  #getMatchLottoNumberCount(lottoNumber) {
    return this.#winningLottoNumber.reduce(
      (count, number, index) => (number === lottoNumber[index] ? count + 1 : count),
      0
    );
  }

  calculateLottoMatchCounts(lottoNumber) {
    const matchLottoNumberCount = this.#getMatchLottoNumberCount(lottoNumber);
    const matchBonusNumberCount = lottoNumber.includes(this.#bonusNumber) ? 1 : 0;
    return { matchLottoNumberCount, matchBonusNumberCount };
  }

  calculateWinningReturnRate(totalCost, totalPrize) {
    const returnRate = (totalPrize / totalCost) * 100;
    return returnRate;
  }
}

export default LottoCalculator;
