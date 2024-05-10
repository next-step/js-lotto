import { LOTTO_GAME } from "../src/constants/lottoGame";
import { LottoGame } from "../src/js/domain/LottoGame";

describe("로또 게임 테스트", () => {
  test(`로또 1장의 가격은 ${LOTTO_GAME.UNIT_PRICE}이다.`, () => {
    const purchasePrice = LOTTO_GAME.UNIT_PRICE;

    const lottoGame = new LottoGame(purchasePrice);
    lottoGame.purchaseUnitLotto();

    expect(lottoGame.result.length).toEqual(1);
  });

  test("구입 금액에 해당하는 만큼 로또를 발행해야 한다.", () => {
    const purchasePrice = LOTTO_GAME.UNIT_PRICE * 8;

    const lottoGame = new LottoGame(purchasePrice);
    lottoGame.purchaseLottos();

    expect(lottoGame.result.length).toEqual(8);
  });
});
