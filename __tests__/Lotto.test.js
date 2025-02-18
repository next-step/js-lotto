import Lotto from "../src/domain/Lotto.js";

describe("로또 게임", () => {
  it("로또는 1000원 당 1장을 구매할 수 있다.", () => {
    const lotto = new Lotto();

    const purchaseAmount = 10000;
    const purchasedLottos = lotto.purchase(purchaseAmount);

    const quantity = purchasedLottos.length;
    expect(quantity).toBe(10);
  });

  it("로또는 1000원 단위로만 구매할 수 있다.", () => {
    const lotto = new Lotto();

    const purchaseAmount = 4500;

    expect(() => {
      lotto.purchase(purchaseAmount);
    }).toThrow("구입 금액은 1000원 단위로 입력해야 합니다.");
  });
});
