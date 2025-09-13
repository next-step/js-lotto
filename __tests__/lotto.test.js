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

  it("로또 번호는 1부터 45까지의 번호 중 중복 없이 6개를 생성한다.", () => {
    //given
    const myLotto = new lotto.Lotto();
    //when
    const lottoUniqueNumbersCount = new Set(myLotto.getNumbers()).size;
    const isValidRangeLottoNumbers = myLotto
      .getNumbers()
      .every((number) => number >= 1 && number <= 45);
    //then
    expect(lottoUniqueNumbersCount).toBe(6);
    expect(isValidRangeLottoNumbers).toBe(true);
  });
});
