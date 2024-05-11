import Lotto from "../src/js/domain/Lotto";

describe("로또 기능 테스트", () => {
  test("각 로또는 랜덤의 서로 다른 1이상 45이하의 정수 6개로 이루어져있다.", () => {
    // given
    const lotto = new Lotto();

    // when
    const lottoNumbers = lotto.numbers;

    // then

    // 중복되지 않는 로또 번호 개수 확인을 위한 집합
    const lottoNumbersSet = new Set();

    expect(lottoNumbers).toHaveLength(Lotto.LENGTH_LOTTO_NUMBERS);
    lottoNumbers.forEach((lottoNumber) => {
      lottoNumbersSet.add(lottoNumber);
      expect(lottoNumber).toBeGreaterThanOrEqual(Lotto.MIN_LOTTO_NUMBER);
      expect(lottoNumber).toBeLessThanOrEqual(Lotto.MAX_LOTTO_NUMBER);
    });
    expect(Array.from(lottoNumbersSet)).toHaveLength(6);
  });

  test("로또를 발행할 때 로또를 구입한 금액 이하의 발급할 수 있는 최대 개수의 로또를 발행한다.", () => {
    // given
    const purchasedAmount = 10001;

    // when
    const lottos = Lotto.generateLottos(purchasedAmount);

    // then
    expect(lottos).toHaveLength(10);
  });
});
