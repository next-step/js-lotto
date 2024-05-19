import LOTTO_SALES from "../src/js/domain/lotto-sales/lotto-sales.constant.js";
import LottoSales from "../src/js/domain/lotto-sales/lotto-sales.model.js";

describe("로또 판매", () => {
  let lottoSales;

  beforeEach(() => {
    lottoSales = new LottoSales();
  });

  it(`로또 한장의 가격은 ${LOTTO_SALES.PRICE}원이다.`, () => {
    const amountPaid = LOTTO_SALES.PRICE;

    const lottos = lottoSales.purchase(amountPaid);

    expect(lottos.length).toBe(1);
  });

  it(`구입 금액에 해당하는 만큼 로또를 발행한다.`, () => {
    const COUNT = 10;
    const amountPaid = COUNT * LOTTO_SALES.PRICE;

    const lottos = lottoSales.purchase(amountPaid);

    expect(lottos.length).toBe(COUNT);
  });

  it("구입 금액이 로또 한장의 가격보다 작으면 로또를 발행하지 않는다.", () => {
    const amountPaid = LOTTO_SALES.PRICE - 1;

    const lottos = lottoSales.purchase(amountPaid);

    expect(lottos.length).toBe(0);
  });

  it("구입 금액이 number 타입이 아니면 에러를 발생시킨다.", () => {
    const amountPaid = "1000";

    expect(() => lottoSales.purchase(amountPaid)).toThrow(TypeError);
  });

  it("구입 금액이 0보다 작으면 에러를 발생시킨다.", () => {
    const amountPaid = -1;

    expect(() => lottoSales.purchase(amountPaid)).toThrow(RangeError);
  });
});
