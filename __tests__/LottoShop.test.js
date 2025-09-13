import { LottoShop } from "../src/domains/LottoShop/index.js";
import { LottoMachine } from "../src/domains/LottoMachine/index.js";

describe("로또 상점은", () => {
  it("구매 금액에 따라 발행할 수 있는 만큼의 로또를 발행한다", () => {
    const lottoShop = new LottoShop({
      lottoMachine: new LottoMachine(),
      lottoPrice: LottoShop.BASE_LOTTO_PRICE,
    });

    const lottos2000 = lottoShop.buyLottos(LottoShop.BASE_LOTTO_PRICE * 2);
    const lottos3000 = lottoShop.buyLottos(LottoShop.BASE_LOTTO_PRICE * 3);
    const lottos4500 = lottoShop.buyLottos(LottoShop.BASE_LOTTO_PRICE * 4.5);

    expect(lottos2000.length).toBe(2);
    expect(lottos3000.length).toBe(3);
    expect(lottos4500.length).toBe(4);
  });
});
