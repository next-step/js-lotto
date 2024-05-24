const PRIZES = {
  FIRST: { count: 0, amount: 2000000000, match: 6 }, // 1등 : 6개 번호 일치
  SECOND: { count: 0, amount: 30000000, match: 5 }, // 2등 : 5개 번호 + 보너스 번호 일치
  THIRD: { count: 0, amount: 1500000, match: 5 }, // 3등 : 5개 번호 일치
  FOURTH: { count: 0, amount: 50000, match: 4 }, // 4등 : 4개 번호 일치
  FIFTH: { count: 0, amount: 5000, match: 3 }, // 5등 : 3개 번호 일치
};

const PRIZE_MAP = [
  { when: ({ hit, bonus }) => hit === 6, match: "FIRST" },
  { when: ({ hit, bonus }) => hit === 5 && bonus, match: "SECOND" },
  { when: ({ hit, bonus }) => hit === 5 && !bonus, match: "THIRD" },
  { when: ({ hit, bonus }) => hit === 4, match: "FOURTH" },
  { when: ({ hit, bonus }) => hit === 3, match: "FIFTH" },
];

class StatisticsLotto {
  #prizes;
  #receive;

  constructor() {
    this.#prizes = { ...PRIZES };
  }

  statisticsLotto(hit, bonus) {
    const prize = PRIZE_MAP.find(({ when }) => when({ hit, bonus }));

    if (prize) {
      this.#prizes[prize.match].count++;
    }

    this.#calculateReceiveMoney(this.#prizes);
  }

  #calculateReceiveMoney(prizes) {
    this.#receive =
      prizes.FIFTH.count * prizes.FIFTH.amount + // 5등
      prizes.FOURTH.count * prizes.FOURTH.amount + // 4등
      prizes.THIRD.count * prizes.THIRD.amount + // 3등
      prizes.SECOND.count * prizes.SECOND.amount + // 2등
      prizes.FIRST.count * prizes.FIRST.amount; // 1등
  }

  calculateRateOfReturn(purchase) {
    return (this.#receive / purchase) * 100;
  }

  getPrizes() {
    return this.#prizes;
  }

  resetCounts() {
    Object.values(this.#prizes).forEach((prize) => {
      prize.count = 0;
    });
  }
}

export { StatisticsLotto };
