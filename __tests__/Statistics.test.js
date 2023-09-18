import Statistics from "../src/js/domain/models/Statistics";
import Rank from "../src/js/domain/models/Rank";

const statistics = new Statistics();

describe("count() 테스트", () => {
  describe("올바른 rankCounts 배열을 반환한다.", () => {
    describe("로또가 1개인 경우", () => {
      const testCases = [
        {
          rank: 1,
          rankCounts: [1, 0, 0, 0, 0, 0],
        },
        {
          rank: 2,
          rankCounts: [0, 1, 0, 0, 0, 0],
        },
        {
          rank: 3,
          rankCounts: [0, 0, 1, 0, 0, 0],
        },
        {
          rank: 4,
          rankCounts: [0, 0, 0, 1, 0, 0],
        },
        {
          rank: 5,
          rankCounts: [0, 0, 0, 0, 1, 0],
        },
        {
          rank: 6,
          rankCounts: [0, 0, 0, 0, 0, 1],
        },
      ];

      it.each(testCases)("rank: $rank", ({ rank, rankCounts }) => {
        const ranks = [Rank.of(rank)];
        expect(statistics.count(ranks)).toEqual(rankCounts);
      });
    });

    describe("로또가 여러 개인 경우", () => {
      const testCases = [
        { rankArr: [1, 2, 3, 4, 5, 6], rankCounts: [1, 1, 1, 1, 1, 1] },
        { rankArr: [1, 5, 6, 6, 6, 6], rankCounts: [1, 0, 0, 0, 1, 4] },
        { rankArr: [2, 5, 6, 6, 6, 6], rankCounts: [0, 1, 0, 0, 1, 4] },
        { rankArr: [3, 5, 6, 6, 6, 6], rankCounts: [0, 0, 1, 0, 1, 4] },
        { rankArr: [4, 5, 6, 6, 6, 6], rankCounts: [0, 0, 0, 1, 1, 4] },
        { rankArr: [5, 5, 6, 6, 6, 6], rankCounts: [0, 0, 0, 0, 2, 4] },
        { rankArr: [5, 6, 6, 6, 6, 6, 6, 6], rankCounts: [0, 0, 0, 0, 1, 7] },
      ];

      it.each(testCases)("rank: $ranks", ({ rankArr, rankCounts }) => {
        const ranks = rankArr.map((rank) => Rank.of(rank));
        expect(statistics.count(ranks)).toEqual(rankCounts);
      });
    });
  });
});

describe("calculateRevenue() 테스트", () => {
  describe("올바른 수익률을 반환한다.", () => {
    describe("로또 개수가 1개인 경우", () => {
      const testCases = [
        {
          rank: 1,
          revenueRate: (2_000_000_000 / 1_000) * 100,
        },
        {
          rank: 2,
          revenueRate: (30_000_000 / 1_000) * 100,
        },
        {
          rank: 3,
          revenueRate: (1_500_000 / 1_000) * 100,
        },
        {
          rank: 4,
          revenueRate: (50_000 / 1_000) * 100,
        },
        {
          rank: 5,
          revenueRate: (5_000 / 1_000) * 100,
        },
        {
          rank: 6,
          revenueRate: (0 / 1_000) * 100,
        },
      ];

      it.each(testCases)("rank: $rank", ({ rank, revenueRate }) => {
        const ranks = [Rank.of(rank)];
        expect(statistics.calculate(ranks)).toBe(revenueRate.toString());
      });
    });

    describe("로또가 여러 개인 경우", () => {
      const testCases = [
        { rankArr: [1, 2, 3, 4, 5, 6], revenueRate: 33859250 },
        { rankArr: [1, 5, 6, 6, 6, 6], revenueRate: 33333416.67 },
        { rankArr: [2, 5, 6, 6, 6, 6], revenueRate: 500083.3 },
        { rankArr: [3, 5, 6, 6, 6, 6], revenueRate: 25083.3 },
        { rankArr: [4, 5, 6, 6, 6, 6], revenueRate: 916.67 },
        { rankArr: [5, 5, 6, 6, 6, 6], revenueRate: 166.67 },
        { rankArr: [5, 6, 6, 6, 6, 6, 6, 6], revenueRate: 62.5 },
      ];

      it.each(testCases)("rankArr: $rankArr", ({ rankArr, revenueRate }) => {
        const ranks = rankArr.map((rank) => Rank.of(rank));
        expect(statistics.calculate(ranks)).toBe(revenueRate.toString());
      });
    });
  });
});
