import createRevenueCalculator from "./createRevenueCalculator.js";

const createResultChecker = () => {
  const PRIZE = Object.freeze({
    1: 2_000_000_000,
    2: 30_000_000,
    3: 1_500_000,
    4: 50_000,
    5: 5_000,
    6: 0,
  });

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
    const rankCountMap = new Map();
    const matchCountMap = new Map();
    const isBonusMatchMap = new Map();

    const LOWEST_MATCHING_COUNT = 3;
    const winningLottos = lottos.filter(
      (lotto) => lotto.getMatchResult().matchCount >= LOWEST_MATCHING_COUNT
    );

    winningLottos.forEach((lotto) => {
      const { matchCount, isBonusMatch } = lotto.getMatchResult();
      const rank = getRank(matchCount, isBonusMatch);
      if (!rankCountMap.has(rank)) {
        rankCountMap.set(rank, 1);
        matchCountMap.set(rank, matchCount);
        isBonusMatchMap.set(rank, isBonusMatch);
      } else {
        rankCountMap.set(rank, rankCountMap.get(rank) + 1);
      }
    });

    const statistics = [];
    for (const [rank, count] of rankCountMap.entries()) {
      statistics.push({
        matchCount: matchCountMap.get(rank),
        isBonusMatch: isBonusMatchMap.get(rank),
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
