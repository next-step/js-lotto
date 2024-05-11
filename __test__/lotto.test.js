import { LOTTO } from "../src/constants/lotto";
import { Lotto } from "../src/js/domain/lotto";

describe("로또 테스트", () => {
  test(`로또 1장은 ${LOTTO.NUMBERS_COUNT}개의 숫자를 가진다.`, () => {
    const lotto = new Lotto(LOTTO.UNIT_PRICE);

    const lottoNumbers = lotto.generate();

    expect(lottoNumbers.length).toEqual(LOTTO.NUMBERS_COUNT);
  });

  test(`로또는 1에서 ${LOTTO.MAX_NUMBER}까지의 숫자를 가진다.`, () => {
    const lotto = new Lotto(LOTTO.UNIT_PRICE);

    const lottoNumbers = lotto.generate();

    lottoNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(LOTTO.MAX_NUMBER);
    });
  });

  test("로또 숫자는 오름차순 정렬되어 있다.", () => {
    const lotto = new Lotto(LOTTO.UNIT_PRICE);

    const lottoNumbers = lotto.generate();

    expect(lottoNumbers).toEqual(lottoNumbers.sort((a, b) => a - b));
  });

  test(`로또 1장의 가격은 ${LOTTO.UNIT_PRICE}이다.`, () => {
    const lottoGame = new Lotto(LOTTO.UNIT_PRICE);
    lottoGame.purchaseLottos();

    expect(lottoGame.lottos.length).toEqual(1);
  });

  test("구입 금액에 해당하는 만큼 로또를 발행해야 한다.", () => {
    const purchasePrice = LOTTO.UNIT_PRICE * 8;

    const lottoGame = new Lotto(purchasePrice);
    lottoGame.purchaseLottos();

    expect(lottoGame.lottos.length).toEqual(8);
  });
});
