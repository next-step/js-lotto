export default class LottoCalculator {
  #lottoResult;

  #winningInfo;

  #accumulateWinAmount;

  static #WIN_TABLE = {
    '3_NUMBERS': ['3개 일치 (5,000원)', 5_000],
    '4_NUMBERS': ['4개 일치 (50,000원)', 50_000],
    '5_NUMBERS': ['5개 일치 (1,500,000원)', 1_500_000],
    '5_NUMBERS_WITH_BONUS': ['5개 일치, 보너스 볼 일치 (30,000,000원)', 30_000_000],
    '6_NUMBERS': ['6개 일치 (2,000,000,000원)', 2_000_000_000],
  };

  constructor() {
    this.#lottoResult = this.#initLottoResult();
    this.#winningInfo = { winningCounts: [], isBonusNumber: [] };
    this.#accumulateWinAmount = 0;
  }

  static #convertToRateOfReturn(rateOfReturn) {
    if (Number.isInteger(rateOfReturn)) return `${rateOfReturn}%`;
    return `${rateOfReturn.toFixed(1)}%`;
  }

  #initLottoResult() {
    return Object.keys(LottoCalculator.#WIN_TABLE).reduce((lottoResult, winTableKey) => {
      const [lottoResultKey] = LottoCalculator.#WIN_TABLE[winTableKey];
      lottoResult[lottoResultKey] = 0;
      return lottoResult;
    }, {});
  }

  #initWinningInfo() {
    this.#winningInfo.winningCounts.push(0);
    this.#winningInfo.isBonusNumber.push(false);
  }

  #addWinningInfo({ lotto, lottoIndex, winningNumbers, bonusNumber }) {
    lotto.forEach((lottoNumber, lottoNumberIndex) => {
      const winningNumber = winningNumbers[lottoNumberIndex];
      if (lottoNumber === winningNumber) this.#winningInfo.winningCounts[lottoIndex] += 1;
      if (lottoNumber === bonusNumber) this.#winningInfo.isBonusNumber[lottoIndex] = true;
    });
  }

  #compareLottosToWinningInfo({ winningNumbers, bonusNumber, lottos }) {
    lottos.forEach((lotto, lottoIndex) => {
      this.#initWinningInfo();
      this.#addWinningInfo({ lotto, lottoIndex, winningNumbers, bonusNumber });
    });
  }

  #createWinTableKey({ winningCount, isBonusNumber, lottoIndex }) {
    return `${winningCount}_NUMBERS${isBonusNumber[lottoIndex] && winningCount === 5 ? '_WITH_BONUS' : ''}`;
  }

  #addLottoResult(winTableKey) {
    if (winTableKey in LottoCalculator.#WIN_TABLE) {
      const [lottoResultKey, lottoWinningAmount] = LottoCalculator.#WIN_TABLE[winTableKey];
      this.#lottoResult[lottoResultKey] += 1;
      this.#accumulateWinAmount += lottoWinningAmount;
    }
  }

  #updateResultsByWinningTableKey() {
    const { winningCounts, isBonusNumber } = this.#winningInfo;
    winningCounts.forEach((winningCount, lottoIndex) => {
      const winTableKey = this.#createWinTableKey({ winningCount, lottoIndex, isBonusNumber });
      this.#addLottoResult(winTableKey);
    });
  }

  #calculateRateOfReturn(investmentAmount) {
    return (this.#accumulateWinAmount / investmentAmount) * 100;
  }

  calculateResult({ investmentAmount, winningNumbers, bonusNumber, lottos }) {
    this.#compareLottosToWinningInfo({ winningNumbers, bonusNumber, lottos });
    this.#updateResultsByWinningTableKey();
    const rateOfReturn = LottoCalculator.#convertToRateOfReturn(this.#calculateRateOfReturn(investmentAmount));
    return [this.#lottoResult, rateOfReturn];
  }
}
