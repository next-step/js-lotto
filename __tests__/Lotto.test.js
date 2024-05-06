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

  test("각 로또는 1이상 45이하의 랜덤인 정수 6개로 이루어져있다.", () => {
    // given
    const lotto = new Lotto();

    // when
    const lottoNumbers = lotto.numbers;

    // then
    expect(lottoNumbers).toHaveLength(6);
    lottoNumbers.forEach((lottoNumber) => {
      expect(lottoNumber).toBeGreaterThanOrEqual(1);
      expect(lottoNumber).toBeLessThanOrEqual(45);
    });
  });
});
