import { LOTTO_PRIZE } from "../constants";

export const LottoRank = {
  getRank(matchedCount, isBonusMatched) {
    switch (matchedCount) {
      case LOTTO_PRIZE.FIRST.if:
        return LOTTO_PRIZE.FIRST.rank;

      case LOTTO_PRIZE.SECOND.if:
        return isBonusMatched ? LOTTO_PRIZE.SECOND.rank : LOTTO_PRIZE.THIRD.rank;

      case LOTTO_PRIZE.FOURTH.if:
        return LOTTO_PRIZE.FOURTH.rank;

      case LOTTO_PRIZE.FIFTH.if:
        return LOTTO_PRIZE.FIFTH.rank;

      default:
        return LOTTO_PRIZE.FAIL.rank;
    }
  },
};
