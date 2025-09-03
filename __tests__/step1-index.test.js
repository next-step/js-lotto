import { buyLotto } from "../src/domain/purchase.js";

describe("로또 게임", () => {
  test("로또 구입 금액 5000원을 입력하면, 로또 5개를 살 수 있다.", async () => {
    const AMOUNT_PAID = 5000;

    const result = buyLotto(AMOUNT_PAID);
    console.log("result", result);
    expect(result).toBe(5);
  });
});
