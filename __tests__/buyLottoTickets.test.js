import {
  buyLottoTickets,
  InvalidPurchaseAmount,
} from "../src/domain/buyLottoTickets";
import Lotto from "../src/domain/Lotto";

describe("buyLottoTickets 함수 테스트", () => {
  it("구입 금액에 따라 올바른 개수의 Lotto 객체 배열을 생성해야 한다.", () => {
    const purchaseAmount = 5000;
    const lottos = buyLottoTickets(purchaseAmount);

    expect(lottos).toHaveLength(5);
    lottos.forEach((lotto) => {
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });

  it.each([1500.5, "3000", null, undefined, false, 500])(
    "구입 금액이 정수가 아니거나 1000원 미만이면 예외를 던져야 한다. (%p)",
    (invalidValue) => {
      expect(() => buyLottoTickets(invalidValue)).toThrow(
        InvalidPurchaseAmount
      );
    }
  );

  it("구입 금액이 1000원 단위가 아닐 경우, 나머지를 버리고 구매 가능한 개수만큼의 로또를 생성해야 한다.", () => {
    const purchaseAmount = 5500;
    const lottos = buyLottoTickets(purchaseAmount);

    expect(lottos).toHaveLength(5);
  });
});
