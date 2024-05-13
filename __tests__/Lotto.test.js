import { Lotto } from "../src/domain/Lotto";

describe("로또 테스트", () => {
  test("로또 1장의 가격은 1,000원이다.", () => {
    // give
    const price = Lotto.PRICE;

    // when + then
    expect(price).toBe(1000);
  });
});
