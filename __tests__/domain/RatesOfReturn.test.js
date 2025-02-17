import RatesOfReturn from "../../src/domain/RatesOfReturn/index.js";
import WinningDetail from "../../src/domain/WinningDetail/index.js";
import Ticket from "../../src/domain/Ticket/index.js";
import PurchaseHistory from "../../src/domain/PurchaseHistory/index.js";
import Lotto from "../../src/domain/Lotto/index.js";

describe("RatesOfReturn 클래스 - 로또 게임에서의 수익률 계산", () => {
  test("구입금액과 당첨 통계를 가지고, 수익률을 계산한다.", () => {
    // given
    const ticket6 = new Ticket({
      numbers: [1, 2, 3, 8, 9, 10], // other
    });

    const purchaseHistory = new PurchaseHistory({
      tickets: [ticket6],
    });

    const lotto = new Lotto({
      purchasePrice: 2000,
      winningNumber: [1, 2, 3, 4, 5, 45],
      bonusNumber: 44,
    });

    const winningDetail = new WinningDetail({
      purchaseHistory,
      lotto,
    });

    const ratesOfReturn = new RatesOfReturn({
      purchasePrice: 8000,
      winningDetail,
    });

    const expectedResult = "62.5%";

    expect(expectedResult).toEqual(ratesOfReturn.getValue);
  });
});
