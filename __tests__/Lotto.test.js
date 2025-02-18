import Lotto from "../src/domain/Lotto.js";

describe("로또 게임", () => {
  let lotto;

  beforeEach(() => {
    lotto = new Lotto();
  });

  it("로또는 1000원 당 1장을 구매할 수 있다.", () => {
    const purchaseAmount = 10000;
    const purchasedLottos = lotto.purchase(purchaseAmount);

    const quantity = purchasedLottos.length;
    expect(quantity).toBe(10);
  });

  it("로또는 1000원 단위로만 구매할 수 있다.", () => {
    const purchaseErrorMessage = "구입 금액은 1000원 단위로 입력해야 합니다.";

    expect(() => {
      lotto.purchase(4500);
    }).toThrow(purchaseErrorMessage);
    expect(() => {
      lotto.purchase("1000");
    }).toThrow(purchaseErrorMessage);
  });

  it("발행된 로또는 한 장에 6개의 숫자를 가지고 있다.", () => {
    const issuedLottos = lotto.issue();

    expect(issuedLottos.length).toEqual(6);
  });
});
