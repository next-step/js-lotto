import createRevenueCalculator from "../src/js/domain/RevenueCalculator";
import {
  PurchasedShouldPositiveError,
  PurchasedShouldMultipleOfThousandError,
} from "../src/js/domain/RevenueCalculator/errors.js";
describe("수익률 계산 테스트", () => {
  const { getRevenueOverPurchased } = createRevenueCalculator();
  describe("계산 예외 케이스 테스트", () => {
    describe("구매 금액이 0 보다 작거나 같으면, 에러를 발생시킨다.", () => {
      it.each([-10_000, -5_000, -1_000, 0])("purchased: %p", (purchased) => {
        expect(() => getRevenueOverPurchased(2_000_000_000, purchased)).toThrow(
          PurchasedShouldPositiveError
        );
      });
    });

    describe("구매 금액이 1_000의 배수가 아니면, 에러를 발생시킨다.", () => {
      it.each([1, 2_500, 17_777])("purchased: %p", (purchased) => {
        expect(() => getRevenueOverPurchased(2_000_000_000, purchased)).toThrow(
          PurchasedShouldMultipleOfThousandError
        );
      });
    });
    describe("유효한 구매금액이라면, 에러를 발생시키지 않는다.", () => {
      it.each([1_000, 5_000, 10_000.0])("purchased: %p", (purchased) => {
        expect(() =>
          getRevenueOverPurchased(2_000_000_000, purchased)
        ).not.toThrow();
      });
    });
  });

  describe("수익률 반환 테스트", () => {
    it("미당첨 시, 0을 반환한다.", () => {
      expect(Calculator.getReturnOfPurchased(0, 1_000)).toBe(0);
    });

    const testCases = [2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000];
    it.each(testCases)(
      "당첨 시, (당첨금/1_000)을 소수 둘째 자리에서 반올림 해 반환한다.",
      (prize) => {
        const expectedPercent = transferToPercent(prize / 1_000);
        expect(Calculator.getReturnOfPurchased(prize, 1_000)).toBe(
          expectedPercent
        );
      }
    );
  });
});
