import { Lotto, LOTTO_DIGITS } from "../src/js/domain/Lotto";
import { buyLottos, LOTTO_PRICE } from "../src/js/domain/LottoService";

describe("로또 구입 테스트", () => {
  test("구입 금액만큼 로또를 발행한다.", () => {
    //given
    const money = 5_000;

    //when
    const lottos = buyLottos(money);

    //then
    expect(lottos.length).toBe(money / LOTTO_PRICE);
    lottos.forEach((e) => {
      expect(e).toBeInstanceOf(Lotto);
      expect(e.numbers.length).toBe(LOTTO_DIGITS);
    });
  });

  test("구입 금액이 숫자가 아니라면 에러를 반환한다.", () => {
    //given
    const wrongMoney = "5000";

    //when
    const whenNotValidMoney = () => buyLottos(wrongMoney);

    //then
    expect(whenNotValidMoney).toThrow();
  });
});
