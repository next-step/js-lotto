import { ErrorLotto } from "../src/constants/error";
import LottoMachine from "../src/domain/LottoMachine";
import WinningLotto from "../src/domain/WinningLotto";

describe("로또 머신 기능", () => {
  test("로또 한장 1000원 미만의 금액을 입력시 에러를 던진다", () => {
    expect(() => new LottoMachine(800)).toThrow(
      ErrorLotto.CHECK_AMOUNT_RECEIVE
    );
  });

  test("입력받은 금액 만큼 로또를 발행한다", () => {
    const lottoMachine = new LottoMachine(3000);
    expect(lottoMachine.number.length).toBe(3);
  });
});
