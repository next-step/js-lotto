import createRevenueCalculator from "./createRevenueCalculator.js";

const createResultChecker = () => {
  const { getRevenuePercentage } = createRevenueCalculator();

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

  function getStatistics(lottos) {
    const PRIZE = Object.freeze({
      1: 2_000_000_000,
      2: 30_000_000,
      3: 1_500_000,
      4: 50_000,
      5: 5_000,
    });

    const MATCH_COUNT = Object.freeze({
      1: 6,
      2: 5,
      3: 5,
      4: 4,
      5: 3,
    });

    const LOWEST_MATCHING_COUNT = 3;

    const winningLottos = lottos.filter(
      (lotto) => lotto.getMatchResult().matchCount >= LOWEST_MATCHING_COUNT
    );

    const rankCountMap = new Map([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ]);

    winningLottos.forEach((lotto) => {
      const { matchCount, isBonusMatch } = lotto.getMatchResult();
      const rank = getRank(matchCount, isBonusMatch);
      rankCountMap.set(rank, rankCountMap.get(rank) + 1);
    });

    const statistics = [];
    for (const [rank, count] of rankCountMap.entries()) {
      const isBonusMatch = rank === 2 ? true : rank === 3 ? false : null;

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
