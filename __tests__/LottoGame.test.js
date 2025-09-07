import { LottoGame } from "../src/domain/LottoGame.js";
import { Lotto } from "../src/domain/Lotto.js";
import { WinningLotto } from "../src/domain/WinningLotto.js";
import { commarize } from "../src/utils/commarize.js";
import { getPercentage } from "../src/utils/getPercentage.js";

const context = describe;

describe(LottoGame.name, () => {
  context("validateLottoPurchasePrice", () => {
    it(`${LottoGame.LOTTO_PRICE}원 단위가 아닌 금액 입력시 에러가 발생합니다.`, () => {
      expect(() => LottoGame.validateLottoPurchasePrice(1500)).toThrow(
        `로또 구입 금액은 ${commarize(
          LottoGame.LOTTO_PRICE
        )}원 단위로 입력해주세요.`
      );
    });
    it("숫자가 아닌 값 입력시 에러가 발생합니다.", () => {
      expect(() => LottoGame.validateLottoPurchasePrice("abc")).toThrow(
        "로또 구입 금액은 숫자값을 입력해주세요."
      );
    });
  });

  describe("checkResult", () => {
    it("등수별 결과가 올바르게 계산된다.", () => {
      const lottos = [
        Lotto.of([1, 2, 3, 4, 5, 6]), // 1등
        Lotto.of([1, 2, 3, 4, 5, 7]), // 2등 (5개+보너스)
        Lotto.of([1, 2, 3, 4, 5, 8]), // 3등 (5개)
        Lotto.of([1, 2, 3, 4, 10, 11]), // 4등 (4개)
        Lotto.of([1, 2, 3, 12, 13, 14]), // 5등 (3개)
        Lotto.of([1, 2, 15, 16, 17, 18]), // 꽝
      ];
      const winningLotto = WinningLotto.of({
        winningNumber: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      });

      const result = LottoGame.checkResult({ lottos, winningLotto });
      expect(result.first).toBe(1);
      expect(result.second).toBe(1);
      expect(result.third).toBe(1);
      expect(result.fourth).toBe(1);
      expect(result.fifth).toBe(1);
    });
  });

  describe("getRateOfReturn", () => {
    it("수익률이 올바르게 계산된다.", () => {
      const lottoResult = {
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        fifth: 1, // 5,000원
      };
      const purchasePrice = 1000;

      const rate = LottoGame.getRateOfReturn({ purchasePrice, lottoResult });

      expect(getPercentage(rate)).toBe(500);
    });
  });
});
