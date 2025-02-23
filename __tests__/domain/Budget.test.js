import Budget from "../../src/domain/Budget.js";

describe("Budget 클래스는", () => {
  describe("=== 생성에 대한 테스트 ===", () => {
    it("예산으로 입력된 값이 0보다 작을때 예외를 던져야한다.", () => {
      const givenBudget = -1000;
      expect(() => new Budget(givenBudget)).toThrow();
    });
    it.each([undefined, "1000", null])(
      "예산으로 입력된 값이 숫자가 아닐때 예외를 던져야한다.",
      () => {
        const givenBudget = "1000";
        expect(() => new Budget(givenBudget)).toThrow();
      },
    );
  });

  describe("=== 로또 갯수에 대한 테스트 ===", () => {
    it("예산과 로또 가격을 입력받으면 로또 갯수를 가지고 있어야 한다", () => {
      const givenBudget = 10000;
      const budget = new Budget(givenBudget);
      const lottoPrice = 1000;
      expect(budget.getLottoCount(lottoPrice)).toBe(10);
    });

    it("예산이 로또 가격보다 작을 때 로또 갯수는 0이어야 한다", () => {
      const givenBudget = 500;
      const budget = new Budget(givenBudget);
      const lottoPrice = 1000;
      expect(budget.getLottoCount(lottoPrice)).toBe(0);
    });

    it("예산이 로또 가격의 배수가 아닐 때 로또 갯수는 예산을 로또 가격으로 나눈 몫이어야 한다", () => {
      const givenBudget = 5001;
      const budget = new Budget(givenBudget);
      const lottoPrice = 1000;
      expect(budget.getLottoCount(lottoPrice)).toBe(5);
    });
  });

  describe("=== 당첨금 누적 및 수익률 계산 테스트 ===", () => {
    it("당첨금을 입력받으면 당첨금이 누적되어야 한다", () => {
      const budget = new Budget(8000);

      budget.addTotalWinningAmount(5000);

      expect(budget.totalWinningAmount).toBe(5000);
    });

    it.each([
      [8000, 0, "0.0"],
      [8000, 4000, "50.0"],
      [8000, 8000, "100.0"],
      [8000, 2000, "25.0"],
    ])(
      "투입 금액이 %i원일 때, 총 당첨금액이 %i원이면 수익률은 %s%%여야 한다",
      (givenBudget, winningAmount, expectedProfit) => {
        const budget = new Budget(givenBudget);

        budget.addTotalWinningAmount(winningAmount);

        expect(budget.getProfit()).toBe(expectedProfit);
      },
    );
  });
});
