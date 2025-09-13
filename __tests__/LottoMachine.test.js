import { LottoMachine } from "../src/domains/LottoMachine/index.js";

describe("로또머신은", () => {
  it("구매 금액에 따라 발행할 수 있는 만큼의 로또를 발행한다", () => {
    const lottoMachine = new LottoMachine(LottoMachine.BASE_LOTTO_PRICE);

    const lottos2000 = lottoMachine.issueLottos(
      LottoMachine.BASE_LOTTO_PRICE * 2
    );
    const lottos3000 = lottoMachine.issueLottos(
      LottoMachine.BASE_LOTTO_PRICE * 3
    );
    const lottos4500 = lottoMachine.issueLottos(
      LottoMachine.BASE_LOTTO_PRICE * 4.5
    );

    expect(lottos2000.length).toBe(2);
    expect(lottos3000.length).toBe(3);
    expect(lottos4500.length).toBe(4);
  });
});
