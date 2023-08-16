import Calculator from "../src/js/Calculator";
const ERROR_MESSAGE = Calculator.ERROR_MESSAGE;
describe("수익률 계산 테스트", () => {
  describe("계산 예외 케이스 테스트", () => {
    it.each([-10_000, -5_000, -1_000, 0])(
      "구매 금액이 0 보다 작거나 같으면 에러를 발생시킨다.",
      (purchased) => {
        expect(() =>
          Calculator.getReturnOfPurchased(20_000_000, purchased)
        ).toThrow(ERROR_MESSAGE.LESS_THAN_ZERO);
      }
    );

    it.each([1, 2_500, 17_777])(
      "구매 금액은 1_000의 배수여야한다.",
      (purchased) => {
        expect(() =>
          Calculator.getReturnOfPurchased(20_000_000, purchased)
        ).toThrow(ERROR_MESSAGE.NOT_MULTIPLE_OF_1000);
      }
    );
  });

  describe("수익률 반환 테스트", () => {
    it("올바른 수익률을 반환한다.", () => {});
  });
});
