import { LottoMachine } from "../src/domains/LottoMachine/index.js";

describe("로또머신은", () => {
  it("필요한 개수만큼의 로또를 발행한다", () => {
    const lottoMachine = new LottoMachine();

    const lottos2 = lottoMachine.issueLottos(2);
    const lottos3 = lottoMachine.issueLottos(3);
    const lottos4 = lottoMachine.issueLottos(4);

    expect(lottos2.length).toBe(2);
    expect(lottos3.length).toBe(3);
    expect(lottos4.length).toBe(4);
  });
});
