import { LOTTO } from "../src/constants/lotto";
import { Lotto } from "../src/js/domain/lotto";

describe("로또 테스트", () => {
  test(`로또 1장은 ${LOTTO.NUMBERS_COUNT}개의 숫자를 가진다.`, () => {
    const lotto = new Lotto();

    const lottoNumbers = lotto.getLottoNumbers();

    expect(lottoNumbers.length).toEqual(LOTTO.NUMBERS_COUNT);
  });

  test(`로또는 1에서 ${LOTTO.MAX_NUMBER}까지의 숫자를 가진다.`, () => {
    const lotto = new Lotto();

    const lottoNumbers = lotto.getLottoNumbers();

    lottoNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(LOTTO.MAX_NUMBER);
    });
  });

  test("로또 숫자는 오름차순 정렬되어 있다.", () => {
    const lotto = new Lotto();

    const lottoNumbers = lotto.getLottoNumbers();

    lottoNumbers.reduce((prev, current) => {
      expect(prev).toBeLessThan(current);
      return current;
    });
  });
});
