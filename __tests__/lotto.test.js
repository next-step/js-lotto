import lotto from "../src/lotto/lotto";

describe("로또 객체 비즈니스 로직 테스트", () => {
  it("로또 구입 금액에 해당하는 만큼 로또를 발행한다.", () => {
    //given
    const purchaseAmount = 10000;
    const lottoPrice = lotto.LOTTO_PRICE;
    //when
    const lottos = lotto.createLotto(purchaseAmount);
    //then
    expect(lottos.length).toBe(purchaseAmount / lottoPrice);
  });
});
