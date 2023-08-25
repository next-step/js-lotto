import Lotto from "../src/js/domain/Lotto";
import createMatchChecker from "../src/js/domain/MatchChecker/createMatchChecker";
import createResultChecker from "../src/js/domain/ResultChecker/createResultChecker";

describe("getSummarizedInfo() 테스트", () => {
  describe("올바른 요약 당첨 통계와 누적 수익률을 반환한다. (winningLotto: [1, 2, 3, 4, 5, 6], 7)", () => {
    const { setWinningLotto, setMatchResult } = createMatchChecker();
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
          percentage: 200_000_000,
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
          percentage: 3_000_000,
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
          percentage: 150_000,
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
          setMatchResult(lotto);

          const { statistics, revenuePercentage } = getSummarizedInfo([lotto]);

          expect(statistics).toEqual(expectedStatistics);
          expect(revenuePercentage).toBe(`${expectedPercentage}%`);
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
        "lotto: $lotto revenuePercentage: 0%",
        ({ lotto: lottoNumbers }) => {
          const lotto = Lotto.of(lottoNumbers);
          setMatchResult(lotto);

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
          expect(revenuePercentage).toBe("0%");
        }
      );
    });

    describe("당첨된 로또 여러 개와 당첨되지 않은 로또 여러 개", () => {
      const testCases = [
        {
          lottos: [
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
          percentage: 15_627_769.23,
        },
        {
          lottos: [
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
          percentage: 2_727.27,
        },
        {
          lottos: [
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
          percentage: 500,
        },
        {
          lottos: [
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
          percentage: 38.46,
        },
        {
          lottos: [
            [8, 21, 23, 41, 42, 43],
            [3, 5, 11, 16, 32, 38],
            [7, 11, 16, 35, 36, 44],
            [1, 8, 11, 31, 41, 42],
            [13, 14, 16, 38, 42, 45],
            [7, 11, 30, 40, 42, 43],
            [2, 13, 22, 32, 38, 45],
            [1, 3, 5, 14, 22, 45],
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
          percentage: 62.5,
        },
      ];

      it.each(testCases)(
        "lottoCounts: $lottos.length revenuePercentage: $percentage%",
        ({
          lottos: lottoNumbers,
          statistics: expectedStatistics,
          percentage: expectedRevenuePercentage,
        }) => {
          const lottos = lottoNumbers.map((lottoNumbers) =>
            Lotto.of(lottoNumbers)
          );

          lottos.map(setMatchResult);

          const { statistics, revenuePercentage } = getSummarizedInfo(lottos);

          expect(statistics).toEqual(expectedStatistics);
          expect(revenuePercentage).toBe(`${expectedRevenuePercentage}%`);
        }
      );
    });
  });
});
