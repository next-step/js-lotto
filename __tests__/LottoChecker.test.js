import { WinningLotto } from "../src/domains/WinningLotto/index.js";
import { Lotto } from "../src/domains/Lotto/index.js";
import { LottoNumber } from "../src/domains/LottoNumber/index.js";
import { LottoChecker } from "../src/domains/LottoChecker/index.js";

describe("로또 검사기는", () => {
  const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
  const BONUS_NUMBER = 7;

  describe("당첨로또와 구매로또들을 비교하여 결과통계를 반환한다", () => {
    it.each([
      {
        description: "1등 1개, 2등 1개가 있는 경우",
        purchasedLottos: [
          [1, 2, 3, 4, 5, 6], // 1등: 6개 일치
          [1, 2, 3, 4, 5, 7], // 2등: 5개 일치 + 보너스
        ],
        expectedRankResult: { 1: 1, 2: 1, 3: 0, 4: 0, 5: 0 },
        expectedTotalPrice:
          LottoChecker.RANK_INFO[1].price + LottoChecker.RANK_INFO[2].price, // 1등 + 2등 상금
      },
      {
        description: "3등 2개, 4등 1개가 있는 경우",
        purchasedLottos: [
          [1, 2, 3, 4, 5, 8], // 3등: 5개 일치
          [1, 2, 3, 4, 5, 9], // 3등: 5개 일치
          [1, 2, 3, 4, 8, 9], // 4등: 4개 일치
        ],
        expectedRankResult: { 1: 0, 2: 0, 3: 2, 4: 1, 5: 0 },
        expectedTotalPrice:
          LottoChecker.RANK_INFO[3].price * 2 + LottoChecker.RANK_INFO[4].price, // 3등 2개 + 4등 1개
      },
      {
        description: "5등 3개가 있는 경우",
        purchasedLottos: [
          [1, 2, 3, 8, 9, 10], // 5등: 3개 일치
          [1, 2, 3, 11, 12, 13], // 5등: 3개 일치
          [1, 2, 3, 14, 15, 7], // 5등: 3개 일치 (보너스 있어도 5등)
        ],
        expectedRankResult: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 3 },
        expectedTotalPrice: LottoChecker.RANK_INFO[5].price * 3, // 5등 3개
      },
      {
        description: "모든 등수가 섞여있는 경우",
        purchasedLottos: [
          [1, 2, 3, 4, 5, 6], // 1등: 6개 일치
          [1, 2, 3, 4, 5, 7], // 2등: 5개 일치 + 보너스
          [1, 2, 3, 4, 5, 8], // 3등: 5개 일치
          [1, 2, 3, 4, 8, 9], // 4등: 4개 일치
          [1, 2, 3, 8, 9, 10], // 5등: 3개 일치
        ],
        expectedRankResult: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
        expectedTotalPrice:
          LottoChecker.RANK_INFO[1].price +
          LottoChecker.RANK_INFO[2].price +
          LottoChecker.RANK_INFO[3].price +
          LottoChecker.RANK_INFO[4].price +
          LottoChecker.RANK_INFO[5].price,
      },
      {
        description: "꽝만 있는 경우",
        purchasedLottos: [
          [8, 9, 10, 11, 12, 13], // 0개 일치
          [14, 15, 16, 17, 18, 19], // 0개 일치
          [1, 2, 20, 21, 22, 23], // 2개 일치 (꽝)
        ],
        expectedRankResult: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        expectedTotalPrice: 0,
      },
      {
        description: "빈 로또 배열인 경우",
        purchasedLottos: [],
        expectedRankResult: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        expectedTotalPrice: 0,
      },
    ])(
      "$description",
      ({ purchasedLottos, expectedRankResult, expectedTotalPrice }) => {
        const winningLotto = new WinningLotto(
          new Lotto(WINNING_NUMBERS),
          new LottoNumber(BONUS_NUMBER)
        );
        const lottos = purchasedLottos.map((numbers) => new Lotto(numbers));

        const result = LottoChecker.checkLotto(winningLotto, lottos);

        expect(result).toEqual({
          rankResult: expectedRankResult,
          totalPrice: expectedTotalPrice,
        });
      }
    );
  });
});
