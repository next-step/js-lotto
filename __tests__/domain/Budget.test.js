import Budget from "../../src/domain/Budget.js";

describe("Budget 클래스는", () => {
  describe("=== 로또 갯수에 대한 테스트 ===", () => {
    it("예산과 로또 가격을 입력받으면 로또 갯수를 가지고 있어야 한다", () => {
      const givenBudget = 10000;
      const budget = new Budget(givenBudget);
      const lottoPrice = 1000;
      expect(budget.getLottoCount(lottoPrice)).toBe(10);
    });
  });

  describe("=== 당첨금 누적 및 수익률 계산 테스트 ===", () => {
    it("당첨금을 입력받으면 당첨금이 누적되어야 한다", () => {
      const budget = new Budget(8000);

      budget.addTotalWinningAmount(5000);

      expect(budget.totalWinningAmount).toBe(5000);
    });

    it.each([
      [0, "0.0"],
      [4000, "50.0"],
      [8000, "100.0"],
      [2000, "25.0"],
    ])(
      "총 당첨금액이 %i원일 때, 수익률은 %s%%여야 한다",
      (winningAmount, expectedProfit) => {
        const givenBudget = 8000;
        const budget = new Budget(givenBudget);

        budget.addTotalWinningAmount(winningAmount);

        expect(budget.getProfit()).toBe(expectedProfit);
      },
    );
  });
});
