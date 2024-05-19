import { LOTTO_PRIZE } from "../constants";

export const LottoRank = {
  getRank(matchedCount, bonusMatched) {
    switch (matchedCount) {
      case LOTTO_PRIZE.FIRST.if:
        return LOTTO_PRIZE.FIRST.rank;

      case LOTTO_PRIZE.SECOND.if:
        return bonusMatched ? LOTTO_PRIZE.SECOND.rank : LOTTO_PRIZE.THIRD.rank;

      case LOTTO_PRIZE.FOURTH.if:
        return LOTTO_PRIZE.FOURTH.rank;

      case LOTTO_PRIZE.FIFTH.if:
        return LOTTO_PRIZE.FIFTH.rank;

      default:
        return LOTTO_PRIZE.FAIL.rank;
    }
  },

  /**
   * @param {Map} lottoRankCounts
   * @returns {Array<{text: string, prize: number, count: number}>}
   */
  getLottoResult(lottoRankCounts) {
    return Object.values(LOTTO_PRIZE).map(({ text, prize, rank }) => {
      const count = lottoRankCounts.get(rank) || 0;
      return { text, prize, count };
    });
  },

  /**
   * @param {Map} lottoRankCounts
   * @returns {number}
   */
  calculateLottoReturn(lottoRankCounts) {
    const total = Array.from(lottoRankCounts.values()).reduce((acc, value) => acc + value, 0);
    const failed = lottoRankCounts.get(LOTTO_PRIZE.FAIL.rank) || 0;
    const lottoReturn = ((total - failed) / total) * 100;

    return lottoReturn;
  },
};
