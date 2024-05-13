class StatisticsLotto {
  static PRIZES = {
    FIRST: { count: 0, amount: 2000000000, match: 6 }, // 1등 : 6개 번호 일치
    SECOND: { count: 0, amount: 30000000, match: 5 }, // 2등 : 5개 번호 + 보너스 번호 일치
    THIRD: { count: 0, amount: 1500000, match: 5 }, // 3등 : 5개 번호 일치
    FOURTH: { count: 0, amount: 50000, match: 4 }, // 4등 : 4개 번호 일치
    FIFTH: { count: 0, amount: 5000, match: 3 }, // 5등 : 3개 번호 일치
  };

  #prizes;
  #receive;

  constructor() {
    this.#prizes = { ...StatisticsLotto.PRIZES };
  }

  statisticsLotto(matchCount, winningLotto) {
    switch (matchCount) {
      case 3: // 5등
        StatisticsLotto.PRIZES.FIFTH.count++;
        break;
      case 4: // 4등
        StatisticsLotto.PRIZES.FOURTH.count++;
        break;
      case 5:
        if (winningLotto) {
          // 2등
          StatisticsLotto.PRIZES.SECOND.count++;
        } else {
          // 3등
          StatisticsLotto.PRIZES.THIRD.count++;
        }
        break;
      case 6: // 1등
        StatisticsLotto.PRIZES.FIFTH.count++;
        break;
      default:
        break;
    }

    this.#calculateReceiveMoney();
  }

  #calculateReceiveMoney() {
    this.#receive =
      StatisticsLotto.PRIZES.FIFTH.count * StatisticsLotto.PRIZES.FIFTH.amount + // 5등
      StatisticsLotto.PRIZES.FOURTH.count *
        StatisticsLotto.PRIZES.FOURTH.amount + // 4등
      StatisticsLotto.PRIZES.THIRD.count * StatisticsLotto.PRIZES.THIRD.amount + // 3등
      StatisticsLotto.PRIZES.SECOND.count *
        StatisticsLotto.PRIZES.SECOND.amount + // 2등
      StatisticsLotto.PRIZES.FIRST.count * StatisticsLotto.PRIZES.FIRST.amount; // 1등
  }

  calculateRateOfReturn(purchase) {
    return (this.#receive / purchase) * 100;
  }

  getPrizes() {
    return this.#prizes;
  }
}

export { StatisticsLotto };
