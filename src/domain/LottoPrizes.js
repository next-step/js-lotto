export default class LottoPrizes {
  static PRIZE_CONDITIONS = [
    {
      requiredMatchCount: 3,
      bonusMatched: false,
      prizeMoney: 5_000,
    },
    {
      requiredMatchCount: 4,
      bonusMatched: false,
      prizeMoney: 50_000,
    },
    {
      requiredMatchCount: 5,
      bonusMatched: false,
      prizeMoney: 1_500_000,
    },
    {
      requiredMatchCount: 5,
      bonusMatched: true,
      prizeMoney: 30_000_000,
    },
    {
      requiredMatchCount: 6,
      bonusMatched: false,
      prizeMoney: 2_000_000_000,
    },
  ];

  #prizes = [];

  constructor(conditions = LottoPrizes.PRIZE_CONDITIONS) {
    this.#prizes = conditions.map((condition) => {
      return { ...condition, matchCount: 0 };
    });
  }

  getPrizeMoney() {
    return this.#prizes
      .filter((prize) => prize.matchCount > 0)
      .reduce((acc, prize) => acc + prize.prizeMoney * prize.matchCount, 0);
  }

  checkPrizeMatch(matchedResults) {
    this.#prizes.forEach((prize) => {
      const matchedLotto = matchedResults.filter((result) => {
        const isMatchCountEqual =
          result.matchCount === prize.requiredMatchCount;
        const isBonusMatchValid =
          !prize.bonusMatched || result.bonusMatched === prize.bonusMatched;

        return isMatchCountEqual && isBonusMatchValid;
      });

      prize.matchCount += matchedLotto.length;
    });
  }

  get status() {
    return this.#prizes.map((prize) => {
      return { ...prize };
    });
  }
}
