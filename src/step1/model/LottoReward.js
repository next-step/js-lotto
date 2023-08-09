export default class LottoReward {
  #lottoResults;

  static #WIN_TABLE = {
    '3_NUMBER': ['3개 일치 (5,000원)', 5_000],
    '4_NUMBER': ['4개 일치 (50,000원)', 50_000],
    '5_NUMBER': ['5개 일치 (1,500,000원)', 1_500_000],
    '5_NUMBER_WITH_BONUS': ['5개 일치, 보너스 볼 일치 (30,000,000원)', 30_000_000],
    '6_NUMBER': ['6개 일치 (2,000,000,000원)', 2_000_000_000],
  };

  constructor(lottoResults) {
    this.#lottoResults = lottoResults;
  }

  static fromLottoReward(lottoResults) {
    return new LottoReward(lottoResults);
  }

  #initLottoResult() {
    return Object.values(LottoReward.#WIN_TABLE)
      .map(([key]) => key)
      .reduce((lottoResult, resultKey) => {
        lottoResult[resultKey] = 0;
        return lottoResult;
      }, {});
  }

  #createWinTableKey({ winningCount, isBonusNumber }) {
    return `${winningCount}_NUMBER${isBonusNumber && winningCount === 5 ? '_WITH_BONUS' : ''}`;
  }

  #updateLottoResult(lottoResult, winTableKey) {
    if (winTableKey in LottoReward.#WIN_TABLE) {
      const [lottoResultKey] = LottoReward.#WIN_TABLE[winTableKey];
      lottoResult[lottoResultKey] += 1;
    }
    return lottoResult;
  }

  #calculateWinningAmount(winningAmount, winTableKey) {
    if (winTableKey in LottoReward.#WIN_TABLE) {
      const [, lottoWinningAmount] = LottoReward.#WIN_TABLE[winTableKey];
      winningAmount += lottoWinningAmount;
    }
    return winningAmount;
  }

  #updateWinningInfo({ winningCount, isBonusNumber, lottoResult, winningAmount }) {
    const winTableKey = this.#createWinTableKey({ winningCount, isBonusNumber });
    return {
      lottoResult: this.#updateLottoResult(lottoResult, winTableKey),
      winningAmount: this.#calculateWinningAmount(winningAmount, winTableKey),
    };
  }

  calculateWinningInfo() {
    return this.#lottoResults.reduce(
      ({ lottoResult, winningAmount }, [winningCount, isBonusNumber]) =>
        this.#updateWinningInfo({ winningCount, isBonusNumber, lottoResult, winningAmount }),
      { lottoResult: this.#initLottoResult(), winningAmount: 0 },
    );
  }
}
