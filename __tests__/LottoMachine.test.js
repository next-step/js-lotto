import { ErrorLottoPurchasedAmount } from "../src/js/constants/error";
import LottoMachine from "../src/js/domain/LottoMachine";

describe("로도 판매 기계 기능 테스트", () => {
  test.each([
    [0, 0],
    [1_000, 1],
    [1_001, 1],
    [10_000.1, 10],
  ])(
    "로또를 구입한 금액이 0 이상인 경우 로또를 구매한 금액이 %s 이면, 발행하는 로또의 개수는 %s이다.",
    (purchasedAmount, lottoCount) => {
      // given
      const lottoMachine = new LottoMachine(purchasedAmount);

      // when
      const availableLottoCount = lottoMachine.getPurchasableLottoCount();

      // then
      expect(availableLottoCount).toBe(lottoCount);
    }
  );

  test.each([
    [
      "가나다",
      ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER,
    ],
    [-1, ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_POSITIVE],
  ])(
    "로또를 구입한 금액이 0 미만이거나 숫자가 아닐 경우 에러가 발생한다.",
    (purchasedAmount, errorMessage) => {
      // when
      const validateAvailableLottoCount = () =>
        LottoMachine.validateLottoPurchasedAmount(purchasedAmount);

      // then
      expect(validateAvailableLottoCount).toThrow(errorMessage);
    }
  );
});
