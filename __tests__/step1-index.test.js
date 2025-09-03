import { buyLotto } from "../src/domain/purchase.js";

describe("로또 게임", () => {
  test("로또 구입 금액 5000원을 입력하면, 로또 5개를 살 수 있다.", async () => {
    const AMOUNT_PAID = 5000;

    const result = buyLotto(AMOUNT_PAID);
    console.log("result", result);
    expect(result).toBe(5);
  });

  test("로또 구입 금액 900원을 입력하면, 로또를 살 수 없다.", async () => {
    const AMOUNT_PAID = 900;

    expect(() => buyLotto(AMOUNT_PAID)).toThrow(
      "로또는 1,000원 이상부터 구매 가능합니다."
    );
  });
});
