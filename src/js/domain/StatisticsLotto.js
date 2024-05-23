const PRIZES = {
  FIRST: { count: 0, amount: 2000000000, match: 6 }, // 1등 : 6개 번호 일치
  SECOND: { count: 0, amount: 30000000, match: 5 }, // 2등 : 5개 번호 + 보너스 번호 일치
  THIRD: { count: 0, amount: 1500000, match: 5 }, // 3등 : 5개 번호 일치
  FOURTH: { count: 0, amount: 50000, match: 4 }, // 4등 : 4개 번호 일치
  FIFTH: { count: 0, amount: 5000, match: 3 }, // 5등 : 3개 번호 일치
};

// PRIZE_MAP 내부를 수정하지 않고 각 등수별 count를 얻는 방법이 없을까
const PRIZE_MAP = [
  { when: ({ hit, bonus }) => hit === 6, match: PRIZES.FIRST },
  { when: ({ hit, bonus }) => hit === 5 && bonus, match: PRIZES.SECOND },
  { when: ({ hit, bonus }) => hit === 5 && !bonus, match: PRIZES.THIRD },
  { when: ({ hit, bonus }) => hit === 4, match: PRIZES.FOURTH },
  { when: ({ hit, bonus }) => hit === 3, match: PRIZES.FIFTH },
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
      prize.match.count++;
    }

    this.#calculateReceiveMoney(this.#prizes);

    return prize;
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
}

export { StatisticsLotto };
