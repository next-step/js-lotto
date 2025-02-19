import Lotto, { FakeNumberGenerator } from "../src/domain/Lotto.js";
import LottoPrize from "../src/domain/LottoPrize.js";
import LottoGame from "../src/domain/LottoGame.js";

describe("로또 게임", () => {
  let lottoGame;

  beforeEach(() => {
    lottoGame = new LottoGame();
  });

  it("로또는 1000원 당 1장을 구매할 수 있다.", () => {
    const purchaseAmount = 10000;
    const purchasedLottos = lottoGame.purchase(purchaseAmount);

    expect(purchasedLottos.length).toBe(10);
  });

  it("로또는 1000원 단위로만 구매할 수 있다.", () => {
    const purchaseErrorMessage = "구입 금액은 1000원 단위로 입력해야 합니다.";

    expect(() => {
      lottoGame.purchase(4500);
    }).toThrow(purchaseErrorMessage);
    expect(() => {
      lottoGame.purchase("1000");
    }).toThrow(purchaseErrorMessage);
  });

  it("당첨 번호는 1부터 45까지의 숫자 6개를 입력해야 한다", () => {
    expect(() => {
      lottoGame.draw([1, 2, 3, 4], 7);
    }).toThrow("당첨 번호는 6개, 보너스 번호는 1개를 입력해야 합니다.");

    expect(() => {
      lottoGame.draw([1, 2, 3, 4, 5, 6], 0);
    }).toThrow("당첨 번호는 1 이상 45 이하 숫자여야 합니다.");

    expect(() => {
      lottoGame.draw([1, 2, 3, 4, 5, 6], 7);
    }).not.toThrow();
  });

  it("당첨 번호와 보너스 번호 포함 여부에 따라 당첨 결과와 수익률을 반환한다.", () => {
    const lottos = [
      new Lotto(1, 45, 6, new FakeNumberGenerator([1, 2, 3, 40, 44, 45])),
      new Lotto(1, 45, 6, new FakeNumberGenerator([1, 2, 3, 4, 5, 7])),
    ];
    const prizes = [
      new LottoPrize(3, false, 5000),
      new LottoPrize(5, true, 20000),
    ];

    const result = lottoGame.draw([1, 2, 3, 4, 5, 6], 7, lottos, prizes);
    const returnRate = lottoGame.getReturnRate(lottos.length, prizes);

    expect(result).toEqual([
      {
        requiredMatchCount: 3,
        bonusMatched: false,
        prizeMoney: 5000,
        matchCount: 1,
      },
      {
        requiredMatchCount: 5,
        bonusMatched: true,
        prizeMoney: 20000,
        matchCount: 1,
      },
    ]);
    expect(returnRate).toBe(1250);
  });
});
