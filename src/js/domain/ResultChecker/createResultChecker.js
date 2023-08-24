const createResultChecker = () => {
  const PRIZE = Object.freeze({
    1: 2_000_000_000,
    2: 30_000_000,
    3: 1_500_000,
    4: 50_000,
    5: 5_000,
    6: 0,
  });

  function getRank(matchCount, isBonusMatch) {
    switch (matchCount) {
      case 6:
        return 1;
      case 5:
        if (isBonusMatch) return 2;
        return 3;
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return 6;
    }
  }

  function getResult(lotto) {
    const { matchCount, isBonusMatch } = lotto.getMatchResult();

    const rank = getRank(matchCount, isBonusMatch);
    const prize = PRIZE[rank];

    return {
      rank,
      prize,
    };
  }

  return {
    getResult,
  };
};

export default createResultChecker;
