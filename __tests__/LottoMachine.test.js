import { Lotto, LottoMachine } from "../src/js/domain/index";
import { TEST_LOTTO, TEST_MONEY } from "./constants";

let lottoMachine;
let lotto;
beforeEach(() => {
  lottoMachine = new LottoMachine();
  lotto = new Lotto(TEST_LOTTO);
});

describe("로또 기계 테스트", () => {
  test("입금액에 따라 로또를 발행한다.", () => {
    //when
    const lottoCounts = lottoMachine.countTheNumberOfLottos(TEST_MONEY);

    //then
    expect(lottoCounts).toBe(8);
  });
});
