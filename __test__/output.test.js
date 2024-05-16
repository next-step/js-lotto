import { LOTTO } from "../src/constants/lotto";
import { PRIZE_MESSAGE } from "../src/constants/message";
import { Lotto } from "../src/domain/Lotto";
import { LottoGame } from "../src/domain/LottoGame";
import { output } from "../src/view/console/output";

describe("출력 테스트", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("구입금액 만큼 로또를 출력한다.", () => {
    const lotto = new Lotto(LOTTO.UNIT_PRICE * 5);

    const lottos = lotto.lottos;
    output.lottos(lottos);

    expect(console.log).toHaveBeenCalledTimes(5);
  });

  test("당첨 내역을 출력한다.", () => {
    const lottos = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 7, 8, 9],
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const lottoGame = new LottoGame(lottos, winningNumbers, bonusNumber);
    output.result(lottoGame.result);

    expect(console.log).toHaveBeenCalledWith(PRIZE_MESSAGE.FIRST_PRIZE(1));
    expect(console.log).toHaveBeenCalledWith(PRIZE_MESSAGE.FIFTH_PRIZE(1));
  });
});
