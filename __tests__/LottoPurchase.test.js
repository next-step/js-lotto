describe("로또구매", () => {
  test("구입 금액이 1000원 단위인가?", () => {
    // given
    const lotto = new LottoPurchase();
    const cost = 1000;

    // when
    const isValid = lotto.amountUnitCheck(cost);

    // then
    expect(isValid).toBe(true);
  });

  test("금액 만큼의 무작위 숫자 배열을 출력하는가?", () => {
    // given
    const lotto = new LottoPurchase();
    const cost = 3000;

    // when
    const lottos = lotto.getLotto(cost);

    // then
    expect(lottos.length).toBe(lotto.count);
  });

  test("로또의 숫자가 6자리인가?", () => {
    // given
    const lotto = new LottoPurchase();
    const cost = 1000;

    // when
    const lottos = lotto.getLotto(cost);

    // then
    expect(lottos[0].length).toBe(6);
  });
});
