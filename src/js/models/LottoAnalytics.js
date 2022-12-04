import { calculateEarningRates, getAnalytics } from "../utils.js";

class LottoAnalytics {
  constructor(lottoNumbers, count) {
    this.winningNumbers = [];
    this.analytics = [];
    this.winningRates = 0;
    this.investments = count * 1000;

    this.setLottoNumbers(lottoNumbers);
  }

  onAnalyze() {
    const analytics = getAnalytics(
      this.getLottoNumbers(),
      this.getWinningNumbers()
    );

    const winningPrice = [5_000, 50_000, 1_500_000, 30_000_000, 2_000_000_000];
    const calculateEarnings = analytics
      .map((count, index) => count * winningPrice[index])
      .reduce((a, b) => a + b, 0);

    this.setAnalytics(analytics);
    this.setWinningRates(
      calculateEarningRates(calculateEarnings, this.investments)
    );
  }

  setAnalytics([three, four, five, fiveWithPlus, six]) {
    this.analytics = [
      {
        correctCount: "3개",
        winningPrice: "5,000",
        winningCount: three.toString(),
      },
      {
        correctCount: "4개",
        winningPrice: "50,000",
        winningCount: four.toString(),
      },
      {
        correctCount: "5개",
        winningPrice: "1,500,000",
        winningCount: five.toString(),
      },
      {
        correctCount: "5개 + 보너스볼",
        winningPrice: "30,000,000",
        winningCount: fiveWithPlus.toString(),
      },
      {
        correctCount: "6개",
        winningPrice: "2,000,000,000",
        winningCount: six.toString(),
      },
    ];
  }

  getAnalytics() {
    return this.analytics;
  }

  setWinningRates(winningRates) {
    this.winningRates = winningRates;
  }

  getWinningRates() {
    return this.winningRates;
  }

  getLottoNumbers() {
    return this.lottoNumbers;
  }

  setLottoNumbers(lottoNumbers) {
    this.lottoNumbers = lottoNumbers;
  }

  getWinningNumbers() {
    return this.winningNumbers;
  }

  setWinningNumbers(winningNumbers) {
    this.winningNumbers = winningNumbers;
  }
}

export default LottoAnalytics;
