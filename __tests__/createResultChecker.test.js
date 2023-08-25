import Lotto from "../src/js/domain/Lotto";
import createMatchChecker from "../src/js/domain/MatchChecker/createMatchChecker";
import createResultChecker from "../src/js/domain/ResultChecker/createResultChecker";

describe("getSummarizedInfo() 테스트", () => {
  describe("올바른 요약 당첨 통계와 누적 수익률을 반환한다. (winningLotto: [1, 2, 3, 4, 5, 6], 7)", () => {
    const { setWinningLotto, checkMatch } = createMatchChecker();
    const { getSummarizedInfo } = createResultChecker();
    setWinningLotto([1, 2, 3, 4, 5, 6], 7);

    describe("당첨된 로또 1개", () => {
      const winningTestCases = [
        {
          lotto: [1, 2, 3, 4, 5, 6],
          statistics: [
            {
              matchCount: 6,
              isBonusMatch: null,
              prize: 2_000_000_000,
              lottoCount: 1,
            },
            {
              matchCount: 5,
              isBonusMatch: true,
              prize: 30_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: false,
              prize: 1_500_000,
              lottoCount: 0,
            },
            { matchCount: 4, isBonusMatch: null, prize: 50_000, lottoCount: 0 },
            { matchCount: 3, isBonusMatch: null, prize: 5_000, lottoCount: 0 },
          ],
          percentage: 2_000_000,
        },
        {
          lotto: [1, 2, 3, 4, 5, 7],
          statistics: [
            {
              matchCount: 6,
              isBonusMatch: null,
              prize: 2_000_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: true,
              prize: 30_000_000,
              lottoCount: 1,
            },
            {
              matchCount: 5,
              isBonusMatch: false,
              prize: 1_500_000,
              lottoCount: 0,
            },
            { matchCount: 4, isBonusMatch: null, prize: 50_000, lottoCount: 0 },
            { matchCount: 3, isBonusMatch: null, prize: 5_000, lottoCount: 0 },
          ],
          percentage: 30_000,
        },
        {
          lotto: [1, 2, 3, 4, 5, 16],
          statistics: [
            {
              matchCount: 6,
              isBonusMatch: null,
              prize: 2_000_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: true,
              prize: 30_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: false,
              prize: 1_500_000,
              lottoCount: 1,
            },
            { matchCount: 4, isBonusMatch: null, prize: 50_000, lottoCount: 0 },
            { matchCount: 3, isBonusMatch: null, prize: 5_000, lottoCount: 0 },
          ],
          percentage: 1_500,
        },
      ];

      it.each(winningTestCases)(
        "lotto: $lotto revenuePercentage: $percentage.00%",
        ({
          lotto: lottoNumbers,
          statistics: expectedStatistics,
          percentage: expectedPercentage,
        }) => {
          const lotto = Lotto.of(lottoNumbers);
          checkMatch(lotto);

          const { statistics, revenuePercentage } = getSummarizedInfo([lotto]);

          expect(statistics).toEqual(expectedStatistics);
          expect(revenuePercentage).toBe(`${expectedPercentage}.00%`);
        }
      );
    });

    describe("당첨되지 않은 로또 1개", () => {
      const nonWinningTestCases = [
        { lotto: [1, 2, 13, 14, 15, 16] },
        { lotto: [1, 2, 13, 14, 15, 7] },
        { lotto: [1, 12, 13, 14, 15, 16] },
        { lotto: [1, 12, 13, 14, 15, 7] },
        { lotto: [11, 12, 13, 14, 15, 16] },
        { lotto: [11, 12, 13, 14, 15, 7] },
      ];

      it.each(nonWinningTestCases)(
        "lotto: $lotto revenuePercentage: 0.00%",
        ({ lotto: lottoNumbers }) => {
          const lotto = Lotto.of(lottoNumbers);
          checkMatch(lotto);

          const { statistics, revenuePercentage } = getSummarizedInfo([lotto]);

          expect(statistics).toEqual([
            {
              matchCount: 6,
              isBonusMatch: null,
              prize: 2_000_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: true,
              prize: 30_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: false,
              prize: 1_500_000,
              lottoCount: 0,
            },
            { matchCount: 4, isBonusMatch: null, prize: 50_000, lottoCount: 0 },
            { matchCount: 3, isBonusMatch: null, prize: 5_000, lottoCount: 0 },
          ]);
          expect(revenuePercentage).toBe("0.00%");
        }
      );
    });

    describe("당첨된 로또 여러 개와 당첨되지 않은 로또 여러 개", () => {
      const testCases = [
        {
          lottoNumbers: [
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 7],
            [1, 2, 3, 4, 5, 16],
            [1, 2, 3, 4, 15, 16],
            [1, 2, 3, 4, 15, 7],
            [1, 2, 3, 14, 15, 16],
            [1, 2, 3, 14, 15, 7],
            [1, 2, 13, 14, 15, 16],
            [1, 2, 13, 14, 15, 7],
            [1, 12, 13, 14, 15, 16],
            [1, 12, 13, 14, 15, 7],
            [11, 12, 13, 14, 15, 16],
            [11, 12, 13, 14, 15, 7],
          ],
          statistics: [
            {
              matchCount: 6,
              isBonusMatch: null,
              prize: 2_000_000_000,
              lottoCount: 1,
            },
            {
              matchCount: 5,
              isBonusMatch: true,
              prize: 30_000_000,
              lottoCount: 1,
            },
            {
              matchCount: 5,
              isBonusMatch: false,
              prize: 1_500_000,
              lottoCount: 1,
            },
            { matchCount: 4, isBonusMatch: null, prize: 50_000, lottoCount: 2 },
            { matchCount: 3, isBonusMatch: null, prize: 5_000, lottoCount: 2 },
          ],
          percentage: "156277.69%",
        },
        {
          lottoNumbers: [
            [1, 2, 3, 4, 15, 16],
            [1, 2, 3, 4, 15, 16],
            [1, 2, 3, 4, 15, 7],
            [1, 2, 3, 4, 15, 7],
            [1, 2, 3, 4, 15, 7],
            [1, 2, 3, 4, 15, 7],
            [1, 2, 13, 14, 15, 16],
            [11, 12, 13, 14, 15, 16],
            [11, 12, 13, 14, 15, 7],
            [1, 2, 13, 14, 15, 16],
            [1, 2, 13, 14, 15, 7],
          ],
          statistics: [
            {
              matchCount: 6,
              isBonusMatch: null,
              prize: 2_000_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: true,
              prize: 30_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: false,
              prize: 1_500_000,
              lottoCount: 0,
            },
            { matchCount: 4, isBonusMatch: null, prize: 50_000, lottoCount: 6 },
            { matchCount: 3, isBonusMatch: null, prize: 5_000, lottoCount: 0 },
          ],
          percentage: "27.27%",
        },
        {
          lottoNumbers: [
            [1, 2, 3, 4, 15, 7],
            [1, 2, 3, 14, 15, 7],
            [11, 12, 13, 14, 15, 7],
            [11, 12, 13, 14, 15, 16],
            [11, 12, 13, 14, 15, 7],
            [1, 2, 13, 14, 15, 16],
            [1, 2, 13, 14, 15, 7],
            [1, 12, 13, 14, 15, 16],
            [1, 12, 13, 14, 15, 7],
            [11, 12, 13, 14, 15, 16],
            [11, 12, 13, 14, 15, 7],
          ],
          statistics: [
            {
              matchCount: 6,
              isBonusMatch: null,
              prize: 2_000_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: true,
              prize: 30_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: false,
              prize: 1_500_000,
              lottoCount: 0,
            },
            { matchCount: 4, isBonusMatch: null, prize: 50_000, lottoCount: 1 },
            { matchCount: 3, isBonusMatch: null, prize: 5_000, lottoCount: 1 },
          ],
          percentage: "5.00%",
        },
        {
          lottoNumbers: [
            [1, 2, 3, 14, 15, 16],
            [1, 2, 13, 14, 15, 16],
            [1, 2, 13, 14, 15, 7],
            [1, 12, 13, 14, 15, 16],
            [1, 12, 13, 14, 15, 7],
            [11, 12, 13, 14, 15, 16],
            [11, 12, 13, 14, 15, 7],
            [1, 2, 13, 14, 15, 16],
            [1, 2, 13, 14, 15, 7],
            [1, 12, 13, 14, 15, 16],
            [1, 12, 13, 14, 15, 7],
            [11, 12, 13, 14, 15, 16],
            [11, 12, 13, 14, 15, 7],
          ],
          statistics: [
            {
              matchCount: 6,
              isBonusMatch: null,
              prize: 2_000_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: true,
              prize: 30_000_000,
              lottoCount: 0,
            },
            {
              matchCount: 5,
              isBonusMatch: false,
              prize: 1_500_000,
              lottoCount: 0,
            },
            { matchCount: 4, isBonusMatch: null, prize: 50_000, lottoCount: 0 },
            { matchCount: 3, isBonusMatch: null, prize: 5_000, lottoCount: 1 },
          ],
          percentage: "0.38%",
        },
      ];

      it.each(testCases)(
        "lottoCounts: $lottoNumbers.length revenuePercentage: $percentage",
        ({
          lottoNumbers,
          statistics: expectedStatistics,
          percentage: expectedRevenuePercentage,
        }) => {
          const lottos = lottoNumbers.map((lottoNumbers) =>
            Lotto.of(lottoNumbers)
          );

          lottos.map(checkMatch);

          const { statistics, revenuePercentage } = getSummarizedInfo(lottos);

          expect(statistics).toEqual(expectedStatistics);
          expect(revenuePercentage).toBe(expectedRevenuePercentage);
        }
      );
    });
  });
});
