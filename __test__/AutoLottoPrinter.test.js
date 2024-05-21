import AutoLottoPrinter from "../src/domain/AutoLottoPrinter";
import Lotto from "../src/domain/Lotto";

describe("AutoLottoPrinter", () => {
  let lottoPrice;
  let autoLottoPrinter;

  beforeEach(() => {
    // given
    lottoPrice = 1000;
    autoLottoPrinter = new AutoLottoPrinter(lottoPrice);
  });

  afterEach(() => {
    lottoPrice = 0;
    autoLottoPrinter = null;
  });

  test("로또를 구매하면 구매한 개수만큼 로또를 발행한다.", () => {
    // when
    const lottoList = autoLottoPrinter.buyLotto(10000);

    // then
    expect(lottoList).toHaveLength(10);
    lottoList.forEach((lotto) => {
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });

  test("로또 구매 최소 금액 보다 적은 금액으로 로또를 구매하려고 하면 에러를 던진다.", () => {
    // when
    const buyLotto = () => autoLottoPrinter.buyLotto(500);

    // then
    expect(buyLotto).toThrow(Error);
  });

  test("로또를 발행하면 로또에 번호를 매긴다.", () => {
    // when
    const lottoList = autoLottoPrinter.buyLotto(1000);

    // then
    lottoList.forEach((lotto) => {
      lotto.numbers.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });
  });
});
