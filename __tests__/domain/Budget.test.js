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
});
