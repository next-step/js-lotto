import Lottos from "../src/domain/Lottos.js";
import LottoPrizes from "../src/domain/LottoPrizes.js";
import LottoGame from "../src/domain/LottoGame.js";
import DrawNumbers from "../src/domain/DrawNumbers.js";

describe("로또 게임", () => {
  let lottoGame;

  beforeEach(() => {
    lottoGame = new LottoGame(new LottoPrizes());
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

  it("로또 번호는 1부터 45까지의 숫자 6개로 구성되어 있다.", () => {
    expect(() => {
      new Lottos({ numbers: [1, 2, 3, 4, 5, 6] });
    }).not.toThrow();
    expect(() => {
      new Lottos({ numbers: [1, 2, 3, 4, 5, 46] });
    }).toThrow("1 이상 45 이하 숫자를 입력해 주세요.");
    expect(() => {
      new Lottos({ numbers: [1, 2, 3, 4, 5] });
    }).toThrow("로또 번호는 6개를 입력해 주세요.");
  });

  it("로또 번호는 서로 중복되지 않아야 한다.", () => {
    expect(() => {
      new Lottos({ numbers: [1, 2, 3, 4, 5, 5] });
    }).toThrow("로또 번호는 중복될 수 없습니다.");
  });

  it("당첨 번호는 1부터 45까지의 숫자 6개와 보너스 번호 1개로 구성되어 있다.", () => {
    expect(() => {
      new DrawNumbers({
        winningNumbers: [1, 2, 3, 4],
        bonusNumber: 7,
      });
    }).toThrow("로또 번호는 6개를 입력해 주세요.");

    expect(() => {
      new DrawNumbers({
        winningNumbers: [1, 2, 3, 4, 5, 46],
        bonusNumber: 7,
      });
    }).toThrow("1 이상 45 이하 숫자를 입력해 주세요.");

    expect(() => {
      new DrawNumbers({
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      });
    }).not.toThrow();
  });

  it("당첨 번호와 보너스 번호는 중복될 수 없다.", () => {
    expect(() => {
      new DrawNumbers({
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 6,
      });
    }).toThrow("로또 번호는 중복될 수 없습니다.");
  });

  it("당첨 번호와 보너스 번호 포함 여부에 따라 당첨 결과와 수익률을 반환한다.", () => {
    const lottos = [new Lottos({ numbers: [1, 2, 3, 10, 11, 12] })];
    lottoGame = new LottoGame(lottos);

    const drawNumbers = new DrawNumbers({
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    });
    const result = lottoGame.draw(drawNumbers);
    const returnRate = lottoGame.getReturnRate();

    expect(result).toEqual([
      {
        requiredMatchCount: 3,
        bonusMatched: false,
        prizeMoney: 5_000,
        matchCount: 1,
      },
      {
        requiredMatchCount: 4,
        bonusMatched: false,
        prizeMoney: 50_000,
        matchCount: 0,
      },
      {
        requiredMatchCount: 5,
        bonusMatched: false,
        prizeMoney: 1_500_000,
        matchCount: 0,
      },
      {
        requiredMatchCount: 5,
        bonusMatched: true,
        prizeMoney: 30_000_000,
        matchCount: 0,
      },
      {
        requiredMatchCount: 6,
        bonusMatched: false,
        prizeMoney: 2_000_000_000,
        matchCount: 0,
      },
    ]);
    expect(returnRate).toBe(500);
  });
});
