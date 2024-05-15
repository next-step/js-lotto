import LottoMachine from "../src/js/domain/LottoMachine";
import { TEST_MONEY } from "./constants";

let lottoMachine;
beforeEach(() => {
  lottoMachine = new LottoMachine();
});

describe("로또 기계 테스트", () => {
  test("입금액에 따라 로또를 발행한다.", () => {
    //given
    const aNumberOfLottos = lottoMachine.getTheNumberOfLottos(TEST_MONEY);

    //when
    const lottos = lottoMachine.buy(TEST_MONEY);

    //then
    expect(lottos.length).toBe(aNumberOfLottos);
  });
});
