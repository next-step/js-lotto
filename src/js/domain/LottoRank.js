export const LottoRank = {
  getRank(matchedCount, isBonusMatched) {
    if (matchedCount === 6) {
      return "FIRST";
    }
    if (matchedCount === 5 && isBonusMatched) {
      return "SECOND";
    }
    if (matchedCount === 5) {
      return "THIRD";
    }
    if (matchedCount === 4) {
      return "FOURTH";
    }
    if (matchedCount === 3) {
      return "FIFTH";
    }
    return "FAIL";
  },
};
