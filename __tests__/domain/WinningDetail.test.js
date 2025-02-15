import Ticket from "../../src/domain/Ticket.js";
import PurchaseHistory from "../../src/domain/PurchaseHistory.js";
import WinningDetail from "../../src/domain/WinningDetail.js";
import Lotto from "../../src/domain/Lotto/index.js";
describe("Winning 클래스 - 당첨 내역을 의미", () => {
  test("당첨은 1등부터 5등까지 등수를 판별한다.", () => {
    // given
    const ticket1 = new Ticket({
      numbers: [1, 2, 3, 4, 5, 45], // 1등
    });
    const ticket2 = new Ticket({
      numbers: [1, 2, 3, 4, 5, 44], // 2등
    });
    const ticket3 = new Ticket({
      numbers: [1, 2, 3, 4, 5, 40], // 3등
    });
    const ticket4 = new Ticket({
      numbers: [6, 2, 3, 4, 5, 40], // 4등
    });
    const ticket5 = new Ticket({
      numbers: [6, 7, 3, 4, 5, 40], // 5등
    });
    const ticket6 = new Ticket({
      numbers: [6, 7, 8, 9, 5, 40], // other
    });

    const purchaseHistory = new PurchaseHistory({
      tickets: [ticket1, ticket2, ticket3, ticket4, ticket5, ticket6],
    });

    const lotto = new Lotto({
      purchasePrice: 2000,
      winningNumber: [1, 2, 3, 4, 5, 45],
      bonusNumber: 44,
    });

    const winningDetail = new WinningDetail({
      purchaseHistory: purchaseHistory,
      lotto: lotto,
    });

    // when
    const actualTicket = {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
    };

    // then
    expect(actualTicket).toEqual(winningDetail.getWinner);
  });
});
