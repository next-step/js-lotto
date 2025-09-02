import { LottoGame } from "../src/domain/LottoGame.js";

describe(LottoGame.name, () => {
  it("구입 금액에 해당하는 만큼 로또를 발행한다.", () => {
    const PURCHASE_PRICE = 8_000;
    const lottoCountToBuy = PURCHASE_PRICE / LottoGame.LOTTO_PRICE;
    const lottoGame = new LottoGame();

    const lottos = lottoGame.buy(PURCHASE_PRICE);

    expect(lottos.length).toBe(lottoCountToBuy);
  });

  it("사용자가 구매한 로또 번호와 당첨 번호를 비교해서 당첨된 등수를 반환한다.", () => {
    const lottoGame = new LottoGame();

    const lottoNumbers = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ];
    const winningNumbers = [1, 2, 3, 7, 8, 9];
    const bonusNumber = 5;

    const lottoResult = lottoGame.checkResult({
      lottoNumbers,
      winningNumbers,
      bonusNumber,
    });

    expect(lottoResult.first).toBe(0);
    expect(lottoResult.second).toBe(0);
    expect(lottoResult.third).toBe(0);
    expect(lottoResult.fourth).toBe(0);
    expect(lottoResult.fifth).toBe(2);
  });
});
