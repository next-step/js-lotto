export default class LottoPrize {
  requiredMatchCount;
  bonusMatched;
  prizeMoney;
  matchCount = 0;

  constructor({ requiredMatchCount, bonusMatched, prizeMoney }) {
    this.requiredMatchCount = requiredMatchCount;
    this.bonusMatched = bonusMatched;
    this.prizeMoney = prizeMoney;
  }

  checkPrizeMatch(results) {
    results.forEach(({ matchCount, bonusMatched }) => {
      const matched =
        this.requiredMatchCount === matchCount &&
        (this.bonusMatched ? this.bonusMatched === bonusMatched : true);

      if (matched) this.matchCount += 1;
    });
  }
}
