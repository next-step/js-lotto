import LottoNumber from "../../src/domain/LottoNumber.js";
import WinningLotto from "../../src/domain/WinningLotto.js";
import Lotto from "../../src/domain/Lotto.js";

describe("WinningLotto 클래스", () => {
  describe("=== 생성자 테스트 ===", () => {
    it("bonusNumber가 LottoNumber 클래스가 아니면 에러를 던진다", () => {
      const winningNumbers = [
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(6),
      ];

      expect(() => new WinningLotto(winningNumbers, 7)).toThrow(
        WinningLotto.INVALID_LOTTO_NUMBER_TYPE,
      );
    });

    it("winningNumber 목록 중 LottoNumber 클래스가 아닌 것이 있으면 에러를 던진다", () => {
      const winningNumbers = [
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        6,
      ];
      const bonusNumber = new LottoNumber(7);
      expect(() => new WinningLotto(winningNumbers, bonusNumber)).toThrow(
        WinningLotto.INVALID_LOTTO_NUMBER_TYPE,
      );
    });

    describe("당첨 번호와 보너스 번호가 중복되면 에러를 던진다", () => {
      it("당첨 번호와 보너스 번호가 동일하면 에러를 던진다", () => {
        const winningNumbers = [
          new LottoNumber(1),
          new LottoNumber(2),
          new LottoNumber(3),
          new LottoNumber(4),
          new LottoNumber(5),
          new LottoNumber(6),
        ];
        const bonusNumber = new LottoNumber(6);
        expect(() => new WinningLotto(winningNumbers, bonusNumber)).toThrow(
          WinningLotto.INVALID_BONUS_NUMBER,
        );
      });
    });
  });

  describe("=== 일치여부 테스트 ===", () => {
    let winningLotto, lotto;

    beforeEach(() => {
      const winningNumbers = [
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(6),
      ];
      const bonusNumber = new LottoNumber(7);
      winningLotto = new WinningLotto(winningNumbers, bonusNumber);
      lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(7),
        new LottoNumber(8),
        new LottoNumber(9),
      ]);
    });

    it("countMatchNumbers()는 Lotto와 비교하여 일치하는 번호의 개수를 반환한다", () => {
      expect(winningLotto.countMatchNumbers(lotto)).toBe(3);
    });

    it("hasBonus()는 Lotto에 보너스 번호가 포함되어 있으면 true를 반환한다", () => {
      expect(winningLotto.hasBonus(lotto)).toBe(true);
    });

    it("hasBonus()는 Lotto에 보너스 번호가 없으면 false를 반환한다", () => {
      lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(8),
        new LottoNumber(9),
        new LottoNumber(10),
      ]);
      expect(winningLotto.hasBonus(lotto)).toBe(false);
    });
  });
});
