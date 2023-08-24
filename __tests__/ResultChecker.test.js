import Lotto from "../src/js/domain/Lotto";

import createMatchChecker from "../src/js/domain/MatchChecker/createMatchChecker";
import createResultChecker from "../src/js/domain/ResultChecker/createResultChecker";

describe("getResult() 테스트", () => {
  const testCases = [
    {
      lotto: [1, 2, 3, 4, 5, 6],
      rank: 1,
      prize: 2_000_000_000,
    },
    {
      lotto: [1, 2, 3, 4, 5, 7],
      rank: 2,
      prize: 30_000_000,
    },
    {
      lotto: [1, 2, 3, 4, 5, 16],
      rank: 3,
      prize: 1_500_000,
    },
    {
      lotto: [1, 2, 3, 4, 15, 16],
      rank: 4,
      prize: 50_000,
    },
    {
      lotto: [1, 2, 3, 4, 15, 7],
      rank: 4,
      prize: 50_000,
    },
    {
      lotto: [1, 2, 3, 14, 15, 16],
      rank: 5,
      prize: 5_000,
    },
    {
      lotto: [1, 2, 3, 14, 15, 7],
      rank: 5,
      prize: 5_000,
    },
    {
      lotto: [1, 2, 13, 14, 15, 16],
      rank: 6,
      prize: 0,
    },
    {
      lotto: [1, 2, 13, 14, 15, 7],
      rank: 6,
      prize: 0,
    },
    {
      lotto: [1, 12, 13, 14, 15, 16],
      rank: 6,
      prize: 0,
    },
    {
      lotto: [1, 12, 13, 14, 15, 7],
      rank: 6,
      prize: 0,
    },
    {
      lotto: [11, 12, 13, 14, 15, 16],
      rank: 6,
      prize: 0,
    },
    {
      lotto: [11, 12, 13, 14, 15, 7],
      rank: 6,
      prize: 0,
    },
  ];

  describe("올바른 등수와 당첨 금액을 반환한다. (winningLotto: [1, 2, 3, 4, 5, 6], 7)", () => {
    const { setWinningLotto, checkMatch } = createMatchChecker();
    const { getResult } = createResultChecker();
    setWinningLotto([1, 2, 3, 4, 5, 6], 7);

    it.each(testCases)(
      "lotto: $lotto, rank: $rank, prize: $prize",
      ({ lotto: lottoNumbers, rank: expectedRank, prize: expectedPrize }) => {
        const lotto = Lotto.of(lottoNumbers);
        checkMatch(lotto);
        const { rank, prize } = getResult(lotto);
        expect(rank).toBe(expectedRank);
        expect(prize).toBe(expectedPrize);
      }
    );
  });
});
