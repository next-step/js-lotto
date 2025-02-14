import Ticket from "../src/domain/Ticket.js";
import PurchaseHistory from "../src/domain/PurchaseHistory.js";

describe("PurchaseHistory 클래스 - 구입 내역을 의미", () => {
  test("[3-1] 구입 내역은 ticket의 집합이다.", () => {
    // given
    const ticket1 = new Ticket({
      numbers: [1, 2, 3, 4, 5, 45],
    });
    const ticket2 = new Ticket({
      numbers: [1, 2, 3, 4, 5, 45],
    });

    // when
    const purchaseHistory = new PurchaseHistory({
      tickets: [ticket1, ticket2],
    });

    // then
    expect(purchaseHistory.getTickets).toEqual([ticket1, ticket2]);
  });
});
