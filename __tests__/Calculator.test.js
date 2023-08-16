import Calculator, { transferToPercent } from "../src/js/Calculator";
const ERROR_MESSAGE = Calculator.ERROR_MESSAGE;
describe("수익률 계산 테스트", () => {
  describe("계산 예외 케이스 테스트", () => {
    it.each([-10_000, -5_000, -1_000, 0])(
      "구매 금액이 0 보다 작거나 같으면 에러를 발생시킨다.",
      (purchased) => {
        expect(() =>
          Calculator.getReturnOfPurchased(2_000_000_000, purchased)
        ).toThrow(ERROR_MESSAGE.LESS_THAN_ZERO);
      }
    );

    it.each([1, 2_500, 17_777])(
      "구매 금액이 1_000의 배수가 아니면 에러를 발생시킨다.",
      (purchased) => {
        expect(() =>
          Calculator.getReturnOfPurchased(2_000_000_000, purchased)
        ).toThrow(ERROR_MESSAGE.NOT_MULTIPLE_OF_1000);
      }
    );

    it("올바른 형태의 구매 금액이 주어지면 에러를 발생시키지 않는다.", () => {
      expect(() =>
        Calculator.getReturnOfPurchased(2_000_000_000, 1_000)
      ).not.toThrow();
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
