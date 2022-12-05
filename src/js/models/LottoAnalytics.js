import { calculateEarningRates, analyzeLottoResult } from "../utils.js";
import { LOTTO } from "../constants.js";

const { PRIZE } = LOTTO;

class LottoAnalytics {
  constructor() {
    this.clear();
  }

  onAnalyze({ winningNumbers, lottoNumbers, investments }) {
    const analytics = analyzeLottoResult(lottoNumbers, winningNumbers);

    const winningPrice = [
      PRIZE.FIFTH,
      PRIZE.FORTH,
      PRIZE.THIRD,
      PRIZE.SECOND,
      PRIZE.FIRST,
    ];
    const calculateEarnings = this.onCalculateEarnings(analytics, winningPrice);

    this.setAnalytics(analytics);
    this.setWinningRates(calculateEarningRates(calculateEarnings, investments));
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

  onCalculateEarnings(analytics, winningPrice) {
    return analytics
      .map((count, index) => count * winningPrice[index])
      .reduce((a, b) => a + b, 0);
  }

  clear() {
    this.analytics = [];
    this.winningRates = 0;
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
}

export default LottoAnalytics;
