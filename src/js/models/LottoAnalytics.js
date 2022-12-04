import { getAnalytics } from "../utils.js";

class LottoAnalytics {
  winningNumbers = [];

  constructor(lottoNumbers) {
    this.setLottoNumbers(lottoNumbers);
  }

  getAnalytics() {
    const [three, four, five, fiveWithPlus, six] = getAnalytics(
      this.getLottoNumbers(),
      this.getWinningNumbers()
    );

    return [
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

  getWinningRates() {
    return 5;
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
