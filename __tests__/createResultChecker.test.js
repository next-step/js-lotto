import Lotto from "../src/js/domain/Lotto";
import createMatchChecker from "../src/js/domain/MatchChecker/createMatchChecker";
import createResultChecker from "../src/js/domain/ResultChecker/createResultChecker";

describe("getSummarizedInfo() 테스트", () => {
  describe("올바른 요약 당첨 정보를 반환한다. (winningLotto: [1, 2, 3, 4, 5, 6], 7)", () => {
    const { setWinningLotto, checkMatch } = createMatchChecker();
    const { getSummarizedInfo } = createResultChecker();
    setWinningLotto([1, 2, 3, 4, 5, 6], 7);

    describe("당첨된 로또 1개", () => {
      const winningTestCases = [
        {
          lotto: [1, 2, 3, 4, 5, 6],
          rank: 1,
          matchCount: 6,
          isBonusMatch: null,
          prize: 2_000_000_000,
          percentage: 2_000_000,
        },
        {
          lotto: [1, 2, 3, 4, 5, 7],
          rank: 2,
          matchCount: 5,
          isBonusMatch: true,
          prize: 30_000_000,
          percentage: 30_000,
        },
        {
          lotto: [1, 2, 3, 4, 5, 16],
          rank: 3,
          matchCount: 5,
          isBonusMatch: false,
          prize: 1_500_000,
          percentage: 1_500,
        },
        {
          lotto: [1, 2, 3, 4, 15, 16],
          rank: 4,
          matchCount: 4,
          isBonusMatch: null,
          prize: 50_000,
          percentage: 50,
        },
        {
          lotto: [1, 2, 3, 4, 15, 7],
          rank: 4,
          matchCount: 4,
          isBonusMatch: null,
          prize: 50_000,
          percentage: 50,
        },
        {
          lotto: [1, 2, 3, 14, 15, 16],
          rank: 5,
          matchCount: 3,
          isBonusMatch: null,
          prize: 5_000,
          percentage: 5,
        },
        {
          lotto: [1, 2, 3, 14, 15, 7],
          rank: 5,
          matchCount: 3,
          isBonusMatch: null,
          prize: 5_000,
          percentage: 5,
        },
      ];

      it.each(winningTestCases)(
        "lotto: $lotto rank: $rank matchCount: $matchCount, isBonusMatch: $isBonusMatch,  prize: $prize, percentage: $percentage%",
        ({
          lotto: lottoNumbers,
          matchCount,
          isBonusMatch,
          prize,
          percentage,
        }) => {
          const lotto = Lotto.of(lottoNumbers);
          checkMatch(lotto);

          const { statistics, revenuePercentage } = getSummarizedInfo([lotto]);

          expect(statistics).toEqual([
            { matchCount, isBonusMatch, prize, lottoCount: 1 },
          ]);
          expect(revenuePercentage).toBe(`${percentage}%`);
        }
      );
    });

    describe("당첨되지 않은 로또 1개", () => {
      const nonWinningTestCases = [
        {
          lotto: [1, 2, 13, 14, 15, 16],
          rank: 6,
          matchCount: 2,
          isBonusMatch: null,
          prize: 0,
        },
        {
          lotto: [1, 2, 13, 14, 15, 7],
          rank: 6,
          matchCount: 2,
          isBonusMatch: null,
          prize: 0,
        },
        {
          lotto: [1, 12, 13, 14, 15, 16],
          rank: 6,
          matchCount: 1,
          isBonusMatch: null,
          prize: 0,
        },
        {
          lotto: [1, 12, 13, 14, 15, 7],
          rank: 6,
          matchCount: 1,
          isBonusMatch: null,
          prize: 0,
        },
        {
          lotto: [11, 12, 13, 14, 15, 16],
          rank: 6,
          matchCount: 0,
          isBonusMatch: null,
          prize: 0,
        },
        {
          lotto: [11, 12, 13, 14, 15, 7],
          rank: 6,
          matchCount: 0,
          isBonusMatch: null,
          prize: 0,
        },
      ];

      it.each(nonWinningTestCases)(
        "lotto: $lotto rank: $rank matchCount: $matchCount, isBonusMatch: $isBonusMatch,  prize: $prize",
        ({ lotto: lottoNumbers }) => {
          const lotto = Lotto.of(lottoNumbers);
          checkMatch(lotto);

          const { statistics, revenuePercentage } = getSummarizedInfo([lotto]);

          expect(statistics).toEqual([]);
          expect(revenuePercentage).toBe("0%");
        }
      );
    });

    describe("당첨된 로또 여러 개와 당첨되지 않은 로또 여러 개가 섞인 경우", () => {});
  });
});
