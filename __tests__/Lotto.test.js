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

  test("각 로또는 랜덤의 서로 다른 1이상 45이하의 정수 6개로 이루어져있다.", () => {
    // given
    const lotto = new Lotto();

    // when
    const lottoNumbers = lotto.numbers;

    // then

    // 중복되지 않는 로또 번호 개수 확인을 위한 집합
    const lottoNumbersSet = new Set();

    expect(lottoNumbers).toHaveLength(6);
    lottoNumbers.forEach((lottoNumber) => {
      lottoNumbersSet.add(lottoNumber);
      expect(lottoNumber).toBeGreaterThanOrEqual(1);
      expect(lottoNumber).toBeLessThanOrEqual(45);
    });
    expect(Array.from(lottoNumbersSet)).toHaveLength(6);
  });
});
