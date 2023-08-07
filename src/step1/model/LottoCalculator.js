export default class LottoCalculator {
  #lottoResult;

  #lottoBuyerStatus;

  #accumulateWinAmount;

  static #WIN_TABLE = {
    '3_NUMBERS': ['3개 일치 (5,000원)', 5_000],
    '4_NUMBERS': ['4개 일치 (50,000원)', 50_000],
    '5_NUMBERS': ['5개 일치 (1,500,000원)', 1_500_000],
    '5_NUMBERS_WITH_BONUS': ['5개 일치, 보너스 볼 일치 (30,000,000원)', 30_000_000],
    '6_NUMBERS': ['6개 일치 (2,000,000,000원)', 2_000_000_000],
  };

  static #convertToRateOfReturn(rateOfReturn) {
    if (Number.isInteger(rateOfReturn)) return `${rateOfReturn}%`;
    return `${rateOfReturn.toFixed(1)}%`;
  }

  constructor() {
    this.#lottoResult = this.#initLottoResult();
    this.#lottoBuyerStatus = { winningCounts: [], isBonusNumber: [] };
    this.#accumulateWinAmount = 0;
  }

  #initLottoResult() {
    return Object.keys(LottoCalculator.#WIN_TABLE).reduce((lottoResult, winTableKey) => {
      const [lottoResultKey] = LottoCalculator.#WIN_TABLE[winTableKey];
      lottoResult[lottoResultKey] = 0;
      return lottoResult;
    }, {});
  }

  #initLottoBuyerStatus() {
    this.#lottoBuyerStatus.winningCounts.push(0);
    this.#lottoBuyerStatus.isBonusNumber.push(false);
  }

  #addLottoBuyerStatus({ lotto, lottoIndex, winningNumbers, bonusNumber }) {
    lotto.forEach((lottoNumber, lottoNumberIndex) => {
      const winningNumber = winningNumbers[lottoNumberIndex];
      if (lottoNumber === winningNumber) this.#lottoBuyerStatus.winningCounts[lottoIndex] += 1;
      if (lottoNumber === bonusNumber) this.#lottoBuyerStatus.isBonusNumber[lottoIndex] = true;
    });
  }

  #compareLottos({ winningNumbers, bonusNumber, lottos }) {
    lottos.forEach((lotto, lottoIndex) => {
      this.#initLottoBuyerStatus();
      this.#addLottoBuyerStatus({ lotto, lottoIndex, winningNumbers, bonusNumber });
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

  #updateResult() {
    const { winningCounts, isBonusNumber } = this.#lottoBuyerStatus;
    winningCounts.forEach((winningCount, lottoIndex) => {
      const winTableKey = this.#createWinTableKey({ winningCount, lottoIndex, isBonusNumber });
      this.#addLottoResult(winTableKey);
    });
  }

  #calculateRateOfReturn(investmentAmount) {
    return (this.#accumulateWinAmount / investmentAmount) * 100;
  }

  calculateResult({ investmentAmount, winningNumbers, bonusNumber, lottos }) {
    this.#compareLottos({ winningNumbers, bonusNumber, lottos });
    this.#updateResult();
    const rateOfReturn = LottoCalculator.#convertToRateOfReturn(this.#calculateRateOfReturn(investmentAmount));
    return [this.#lottoResult, rateOfReturn];
  }
}
