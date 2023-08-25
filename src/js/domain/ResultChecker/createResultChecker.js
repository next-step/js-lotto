import createRevenueCalculator from "./createRevenueCalculator.js";

const createResultChecker = () => {
  const RANK = Object.freeze({
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
    FOURTH: 4,
    FIFTH: 5,
    NONE: 6,
  });

  const PRIZE = Object.freeze({
    [RANK.FIRST]: 2_000_000_000,
    [RANK.SECOND]: 30_000_000,
    [RANK.THIRD]: 1_500_000,
    [RANK.FOURTH]: 50_000,
    [RANK.FIFTH]: 5_000,
  });

  const MATCH_COUNT = Object.freeze({
    [RANK.FIRST]: 6,
    [RANK.SECOND]: 5,
    [RANK.THIRD]: 5,
    [RANK.FOURTH]: 4,
    [RANK.FIFTH]: 3,
  });

  const LOWEST_MATCHING_COUNT = 3;

  const { getRevenuePercentage } = createRevenueCalculator();

  function getRank(matchCount, isBonusMatch) {
    switch (matchCount) {
      case 6:
        return RANK.FIRST;
      case 5:
        if (isBonusMatch) return RANK.SECOND;
        return RANK.THIRD;
      case 4:
        return RANK.FOURTH;
      case 3:
        return RANK.FIFTH;
      default:
        return RANK.NONE;
    }
  }

  function getStatistics(lottos) {
    const winningLottos = lottos.filter(
      (lotto) => lotto.getMatchResult().matchCount >= LOWEST_MATCHING_COUNT
    );

    const rankCountMap = new Map([
      [RANK.FIRST, 0],
      [RANK.SECOND, 0],
      [RANK.THIRD, 0],
      [RANK.FOURTH, 0],
      [RANK.FIFTH, 0],
    ]);

    winningLottos.forEach((lotto) => {
      const { matchCount, isBonusMatch } = lotto.getMatchResult();
      const rank = getRank(matchCount, isBonusMatch);
      rankCountMap.set(rank, rankCountMap.get(rank) + 1);
    });

    const statistics = [];
    for (const [rank, count] of rankCountMap.entries()) {
      const isBonusMatch =
        rank === RANK.SECOND ? true : rank === RANK.THIRD ? false : null;

      statistics.push({
        matchCount: MATCH_COUNT[rank],
        isBonusMatch,
        prize: PRIZE[rank],
        lottoCount: count,
      });
    }

    return statistics;
  }

  function getAccumulatedPrize(statistics) {
    return statistics.reduce(
      (acc, { prize, lottoCount }) => acc + prize * lottoCount,
      0
    );
  }

  function getAccumulatedPurchased(lottos) {
    const LOTTO_PRICE = 1_000;
    return LOTTO_PRICE * lottos.length;
  }

  function getSummarizedInfo(lottos) {
    const statistics = getStatistics(lottos);
    const accumulatedPrize = getAccumulatedPrize(statistics);
    const accumulatedPurchased = getAccumulatedPurchased(lottos);
    const revenuePercentage = getRevenuePercentage(
      accumulatedPrize,
      accumulatedPurchased
    );

    return { statistics, revenuePercentage };
  }

  return {
    getSummarizedInfo,
  };
};

export default createResultChecker;
