import Budget from "../../src/domain/Budget.js";
import LottoGame from "../../src/domain/LottoGame.js";
import LottoNumber from "../../src/domain/LottoNumber.js";
import WinningLotto from "../../src/domain/WinningLotto.js";
import Lotto from "../../src/domain/Lotto.js";

describe("LottoGame 클래스는", () => {
  describe("> 로또 구매", () => {
    it("예산에 맞게 로또 티켓들을 구매해야 한다", () => {
      const budget = new Budget(10000);
      const lottoGame = new LottoGame(budget);
      lottoGame.buyLottos();
      expect(lottoGame.getLottos()).toHaveLength(10);
    });
  });

  describe("> 당첨 확인", () => {
    it("로또가 당첨되었을 경우, 총 당첨금액을 예산에 누적시켜야 한다", () => {
      const budget = new Budget(10_000);
      const lotto = new Lotto([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(6),
      ]);
      const lottoGame = new LottoGame(budget, [lotto]);

      const winningNumbers = [
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(6),
      ];
      const bonusNumber = new LottoNumber(7);
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

      lottoGame.calculateTotalWinningAmount(winningLotto);

      const expectedTotalAmount = 2_000_000_000;
      expect(budget.totalWinningAmount).toBe(expectedTotalAmount);
    });
  });
});
