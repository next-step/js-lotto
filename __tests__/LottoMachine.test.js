import { LOTTO_PRIZE } from "../src/js/constants";
import LottoMachine from "../src/js/domain/LottoMachine";
import { TEST_LOTTO_NUMBERS, TEST_MONEY } from "./constants";
import { Lotto, WinningLotto } from "../src/js/domain/Lotto";

let lottoMachine;
let lotto;
beforeEach(() => {
  lottoMachine = new LottoMachine();
  lotto = new Lotto(TEST_LOTTO_NUMBERS);
});

describe("로또 기계 테스트", () => {
  test("입금액에 따라 로또를 발행한다.", () => {
    //given
    const aNumberOfLottos = lottoMachine.countTheNumberOfLottos(TEST_MONEY);

    //when
    const lottos = lottoMachine.buy(TEST_MONEY);

    //then
    expect(lottos.length).toBe(aNumberOfLottos);
  });

  test("6개의 로또 번호가 일치하면 1등이다.", () => {
    //given
    const winningLotto = new WinningLotto(new Lotto([15, 23, 12, 1, 34, 26]), 7);

    //when
    const lottoRanks = winningLotto.getRank(lotto);

    //then
    expect(lottoRanks).toBe(LOTTO_PRIZE.FIRST.rank);
  });

  test("5개의 로또 번호와 보너스 번호가 일치하면 2등이다.", () => {
    //given
    const winningLotto = new WinningLotto(new Lotto([7, 23, 12, 1, 34, 26]), 15);

    //when
    const lottoRanks = winningLotto.getRank(lotto);

    //then
    expect(lottoRanks).toBe(LOTTO_PRIZE.SECOND.rank);
  });

  test("5개의 로또 번호만 일치하면 3등이다.", () => {
    //given
    const winningLotto = new WinningLotto(new Lotto([14, 23, 12, 1, 34, 26]), 7);

    //when
    const lottoRanks = winningLotto.getRank(lotto);

    //then
    expect(lottoRanks).toBe(LOTTO_PRIZE.THIRD.rank);
  });

  test("4개의 로또 번호만 일치하면 4등이다.", () => {
    //given
    const winningLotto = new WinningLotto(new Lotto([14, 22, 12, 1, 34, 26]), 7);

    //when
    const lottoRanks = winningLotto.getRank(lotto);

    //then
    expect(lottoRanks).toBe(LOTTO_PRIZE.FOURTH.rank);
  });

  test("3개의 로또 번호만 일치하면 5등이다.", () => {
    //given
    const winningLotto = new WinningLotto(new Lotto([14, 22, 11, 1, 34, 26]), 7);

    //when
    const lottoRanks = winningLotto.getRank(lotto);

    //then
    expect(lottoRanks).toBe(LOTTO_PRIZE.FIFTH.rank);
  });
});
