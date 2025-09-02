import { LottoGame } from "../src/domain/LottoGame.js";

describe(LottoGame.name, () => {
  it("구입 금액에 해당하는 만큼 로또를 발행한다.", () => {
    const PURCHASE_PRICE = 8_000;
    const lottoGame = new LottoGame();

    const lottos = lottoGame.buy(PURCHASE_PRICE);

    expect(lottos.length).toBe(PURCHASE_PRICE / 1000);
  });
});
