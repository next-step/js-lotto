import { ErrorLotto } from "../src/constants/error";
import LottoMachine, { LOTTO_PRICE } from "../src/domain/LottoMachine";

describe("로또 머신 기능", () => {
  test("로또 한장 1000원 미만의 금액을 입력시 에러를 발생한다.", () => {
    const lottoMachine = new LottoMachine();
    expect(() => lottoMachine.buyLottoList(800)).toThrow(
      ErrorLotto.CHECK_AMOUNT_RECEIVE
    );
  });

  test("입력받은 금액 만큼 로또를 발행한다", () => {
    const lottoMachine = new LottoMachine(LOTTO_PRICE);
    const lottoCount = lottoMachine.buyLottoList(3000);
    expect(lottoCount.length).toBe(3);
  });
});
