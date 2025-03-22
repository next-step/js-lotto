import Lottos from "../src/domain/Lottos.js";
import LottoPrizes from "../src/domain/LottoPrizes.js";
import LottoGame from "../src/domain/LottoGame.js";
import WinningNumbers from "../src/domain/WinningNumbers.js";
import BonusNumbers from "../src/domain/BonusNumbers.js";
import DrawNumbers from "../src/domain/DrawNumbers.js";

describe("로또 게임", () => {
  let lottoGame;

  beforeEach(() => {
    lottoGame = new LottoGame(new LottoPrizes());
  });

  describe("로또 구입", () => {
    it("로또는 1000원 단위로 구매할 수 있다. 구매 금액 1000원 당 로또 1장을 받을 수 있다.", () => {
      const purchaseAmount = 10000;
      const purchasedLottos = lottoGame.purchase(purchaseAmount);

      const quantity = purchasedLottos.length;
      expect(quantity).toBe(10);
    });

    it("1000원으로 나누어 떨어지지 않는 금액을 입력하면 예외가 발생한다.", () => {
      expect(() => {
        lottoGame.purchase(4500);
      }).toThrow("구입 금액은 1000원 단위로 입력해야 합니다.");
      expect(() => {
        lottoGame.purchase(-4000);
      }).toThrow("구입 금액은 1000원 단위로 입력해야 합니다.");
    });

    it("구입 금액이 숫자가 아니면 예외가 발생한다.", () => {
      expect(() => {
        lottoGame.purchase("1000");
      }).toThrow("구입 금액은 1000원 단위로 입력해야 합니다.");
    });
  });

  describe("당첨 결과 출력", () => {
    it("당첨 번호와 보너스 번호 포함 여부에 따라 당첨 결과와 수익률을 반환한다.", () => {
      const lottos = [new Lottos({ numbers: [1, 2, 3, 10, 11, 12] })];
      lottoGame = new LottoGame(lottos);

      const drawNumbers = new DrawNumbers({
        winningNumbers: new WinningNumbers({ numbers: [1, 2, 3, 4, 5, 6] }),
        bonusNumbers: new BonusNumbers({ numbers: [7] }),
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

    it("5개 + 보너스 일치가 되는 경우 2등으로 취급된다.", () => {
      const lottos = [new Lottos({ numbers: [1, 2, 3, 4, 5, 6] })];
      lottoGame = new LottoGame(lottos);

      const drawNumbers = new DrawNumbers({
        winningNumbers: new WinningNumbers({ numbers: [1, 2, 3, 4, 5, 7] }),
        bonusNumbers: new BonusNumbers({ numbers: [6] }),
      });
      const result = lottoGame.draw(drawNumbers);
      const returnRate = lottoGame.getReturnRate();

      expect(result).toEqual([
        {
          requiredMatchCount: 3,
          bonusMatched: false,
          prizeMoney: 5_000,
          matchCount: 0,
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
          matchCount: 1,
        },
        {
          requiredMatchCount: 6,
          bonusMatched: false,
          prizeMoney: 2_000_000_000,
          matchCount: 0,
        },
      ]);

      expect(returnRate).toBe(3_000_000);
    });
  });
});
