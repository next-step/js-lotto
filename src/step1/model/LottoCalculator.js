export default class LottoCalculator {
  #lottoResult;

  #lottoBuyerStatus;

  static #WIN_TABLE = {
    '3_NUMBERS': ['3개 일치 (5,000원)', 5_000],
    '4_NUMBERS': ['4개 일치 (50,000원)', 50_000],
    '5_NUMBERS': ['5개 일치 (1,500,000원)', 1_500_000],
    '5_NUMBERS_WITH_BONUS': ['5개 일치, 보너스 볼 일치 (30,000,000원)', 30_000_000],
    '6_NUMBERS': ['6개 일치 (2,000,000,000원)', 2_000_000_000],
  };

  static #convertToRateOfReturn(rateOfReturn) {
    if (Number.isInteger(rateOfReturn)) return rateOfReturn;
    return rateOfReturn.toFixed(1);
  }

  constructor() {
    this.#lottoResult = this.#initLottoResult();
    this.#lottoBuyerStatus = { winningCount: 0, isBonusNumber: false, accumulateWinAmount: 0 };
  }

  #initLottoResult() {
    return Object.keys(LottoCalculator.#WIN_TABLE).reduce((lottoResult, winTableKey) => {
      const [lottoResultKey] = LottoCalculator.#WIN_TABLE[winTableKey];
      lottoResult[lottoResultKey] = 0;
      return lottoResult;
    }, {});
  }

  #compareLottos({ winningNumbers, bonusNumber, lottos }) {
    lottos.forEach((lotto) => {
      lotto.forEach((lottoNumber, i) => {
        const winningNumber = winningNumbers[i];
        if (lottoNumber === winningNumber) this.#lottoBuyerStatus.winningCount += 1;
        if (lottoNumber === bonusNumber) this.#lottoBuyerStatus.isBonusNumber = true;
      });
    });
  }

  #updateResult() {
    const { winningCount, isBonusNumber } = this.#lottoBuyerStatus;
    const winTableKey = `${winningCount}_NUMBERS${isBonusNumber && winningCount === 5 ? '_WITH_BONUS' : ''}`;
    if (winTableKey in LottoCalculator.#WIN_TABLE) {
      const [lottoResultKey, lottoWinningAmount] = LottoCalculator.#WIN_TABLE[winTableKey];
      this.#lottoResult[lottoResultKey] += 1;
      this.#lottoBuyerStatus.accumulateWinAmount += lottoWinningAmount;
    }
  }

  #calculateRateOfReturn(investmentAmount) {
    return Math.floor(this.#lottoBuyerStatus.accumulateWinAmount / investmentAmount) * 100;
  }

  calculateResult({ investmentAmount, winningNumbers, bonusNumber, lottos }) {
    this.#compareLottos({ winningNumbers, bonusNumber, lottos });
    this.#updateResult();
    const rateOfReturn = LottoCalculator.#convertToRateOfReturn(this.#calculateRateOfReturn(investmentAmount));
    return [this.#lottoResult, rateOfReturn];
  }
}
