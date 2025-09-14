import { WinningLotto } from "../src/domains/WinningLotto/index.js";
import { Lotto } from "../src/domains/Lotto/index.js";
import { LottoNumber } from "../src/domains/LottoNumber/index.js";

describe("당첨 로또는", () => {
  const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
  const BONUS_NUMBER = 7;

  describe("로또를 평가하여 평가결과를 반환한다", () => {
    it.each([
      {
        description: "1등: 6개 번호가 모두 일치하는 경우",
        purchasedNumbers: [1, 2, 3, 4, 5, 6],
        expectedMatchingCount: 6,
        expectedBonusMatched: false,
      },
      {
        description: "2등: 5개 번호 일치 + 보너스 번호 일치",
        purchasedNumbers: [1, 2, 3, 4, 5, 7],
        expectedMatchingCount: 5,
        expectedBonusMatched: true,
      },
      {
        description: "3등: 5개 번호 일치 (보너스 번호 불일치)",
        purchasedNumbers: [1, 2, 3, 4, 5, 8],
        expectedMatchingCount: 5,
        expectedBonusMatched: false,
      },
      {
        description: "4등: 4개 번호 일치",
        purchasedNumbers: [1, 2, 3, 4, 8, 9],
        expectedMatchingCount: 4,
        expectedBonusMatched: false,
      },
      {
        description: "5등: 3개 번호 일치",
        purchasedNumbers: [1, 2, 3, 8, 9, 7],
        expectedMatchingCount: 3,
        expectedBonusMatched: true,
      },
      {
        description: "꽝: 일치하는 번호가 없는 경우",
        purchasedNumbers: [8, 9, 10, 11, 12, 13],
        expectedMatchingCount: 0,
        expectedBonusMatched: false,
      },
      {
        description: "꽝: 2개만 일치하는 경우",
        purchasedNumbers: [1, 2, 8, 9, 10, 11],
        expectedMatchingCount: 2,
        expectedBonusMatched: false,
      },
    ])(
      "$description",
      ({ purchasedNumbers, expectedMatchingCount, expectedBonusMatched }) => {
        const winningLotto = new WinningLotto(
          new Lotto(WINNING_NUMBERS),
          new LottoNumber(BONUS_NUMBER)
        );
        const purchasedLotto = new Lotto(purchasedNumbers);

        const result = winningLotto.evaluateLotto(purchasedLotto);

        expect(result).toEqual({
          matchingCount: expectedMatchingCount,
          isBonusNumberMatched: expectedBonusMatched,
        });
      }
    );
  });
});
