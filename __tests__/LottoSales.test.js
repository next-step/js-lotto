import LOTTO_SALES from "../src/js/domain/lotto-sales/lotto-sales.constant.js";
import LottoSales from "../src/js/domain/lotto-sales/lotto-sales.model.js";

describe("로또 판매", () => {
  it(`로또 한장의 가격은 ${LOTTO_SALES.PRICE}원이다.`, () => {
    const lottoSales = new LottoSales();
    const amount_paid = LOTTO_SALES.PRICE;

    const lottos = lottoSales.purchase(amount_paid);

    expect(lottos.length).toBe(1);
  });

  it(`구입 금액에 해당하는 만큼 로또를 발행한다.`, () => {
    const lottoSales = new LottoSales();
    const count = 10;
    const amount_paid = count * LOTTO_SALES.PRICE;

    const lottos = lottoSales.purchase(amount_paid);

    expect(lottos.length).toBe(count);
  });

  it("구입 금액이 로또 한장의 가격보다 작으면 로또를 발행하지 않는다.", () => {
    const lottoSales = new LottoSales();
    const amount_paid = LOTTO_SALES.PRICE - 1;

    const lottos = lottoSales.purchase(amount_paid);

    expect(lottos.length).toBe(0);
  });

  it("구입 금액이 number 타입이 아니면 에러를 발생시킨다.", () => {
    const lottoSales = new LottoSales();
    const amount_paid = "1000";

    expect(() => lottoSales.purchase(amount_paid)).toThrow(TypeError);
  });

  it("구입 금액이 0보다 작으면 에러를 발생시킨다.", () => {
    const lottoSales = new LottoSales();
    const amount_paid = -1;

    expect(() => lottoSales.purchase(amount_paid)).toThrow(RangeError);
  });
});
