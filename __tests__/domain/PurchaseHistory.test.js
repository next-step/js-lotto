import Ticket from "../../src/domain/Ticket.js";
import PurchaseHistory from "../../src/domain/PurchaseHistory.js";

describe("PurchaseHistory 클래스 - 구입 내역을 의미해요", () => {
  test("구입 내역은 로또 게임 당 여러 개의 로또 번호 집합으로, tickets이라는 인스턴스 변수를 가집니다.", () => {
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
