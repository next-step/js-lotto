import Lotto from "../src/js/domain/Lotto";

describe("로또 기능 테스트", () => {
  test("로또 한장의 가격은 1,000원이다.", () => {
    // given
    const lotto = new Lotto();

    // when
    const lottoPrice = lotto.price;

    // then
    expect(lottoPrice).toBe(1000);
  });
});
