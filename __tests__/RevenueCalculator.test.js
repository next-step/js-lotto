import createRevenueCalculator from "../src/js/domain/RevenueCalculator/createRevenueCalculator";
import {
  PurchasedShouldPositiveError,
  PurchasedShouldMultipleOfThousandError,
} from "../src/js/domain/RevenueCalculator/errors.js";

const { getRevenueOverPurchased } = createRevenueCalculator();
describe("수익률 계산 테스트", () => {
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

  describe("getRevenueOverPurchased() 테스트", () => {
    it("미당첨 시, 0%를 반환한다.", () => {
      expect(getRevenueOverPurchased(0, 1_000)).toBe("0%");
    });

    describe("올바른 수익률을 반환한다. (purchased: 1000)", () => {
      const testCases = [
        { revenue: 2_000_000_000, percentage: 2_000_000 },
        { revenue: 30_000_000, percentage: 30_000 },
        { revenue: 1_500_000, percentage: 1_500 },
        { revenue: 50_000, percentage: 50 },
        { revenue: 5_000, percentage: 5 },
      ];
      it.each(testCases)(
        "누적 수익: $revenue, 수익률: $percentage%",
        ({ revenue, percentage: expectedPercentage }) => {
          expect(getRevenueOverPurchased(revenue, 1_000)).toBe(
            `${expectedPercentage}%`
          );
        }
      );
    });
  });
});
