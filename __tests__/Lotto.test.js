import Lotto, { FakeNumberGenerator } from "../src/domain/Lotto.js";
import LottoPrize from "../src/domain/LottoPrize.js";
import LottoGame from "../src/domain/LottoGame.js";

describe("로또 게임", () => {
  let lottoGame;

  beforeEach(() => {
    lottoGame = new LottoGame();
  });

  it("로또는 1000원 단위로 구매할 수 있다. 구매 금액 1000원 당 로또 1장을 받을 수 있다.", () => {
    const purchaseAmount = 10000;
    const purchasedLottos = lottoGame.purchase(purchaseAmount);

    const quantity = purchasedLottos.length;
    expect(quantity).toBe(10);
  });

  it("로또 구입 시에는 1000으로 나누어 떨어지는 양수를 입력해야 한다.", () => {
    expect(() => {
      lottoGame.purchase(4500);
    }).toThrow("구입 금액은 1000원 단위로 입력해야 합니다.");
    expect(() => {
      lottoGame.purchase(-4000);
    }).toThrow("구입 금액은 1000원 단위로 입력해야 합니다.");
  });

  it("로또 구입 시 Number 타입만 입력이 가능하다.", () => {
    expect(() => {
      lottoGame.purchase("1000");
    }).toThrow("구입 금액은 1000원 단위로 입력해야 합니다.");
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
      new LottoPrize({
        requiredMatchCount: 3,
        bonusMatched: false,
        prizeMoney: 5_000,
      }),
      new LottoPrize({
        requiredMatchCount: 5,
        bonusMatched: true,
        prizeMoney: 20_000,
      }),
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
