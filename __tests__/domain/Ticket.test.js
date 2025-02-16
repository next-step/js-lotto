import Ticket from "../../src/domain/Ticket.js";
import { ERROR_TICKET } from "../../src/util/error.js";
describe("Ticket 클래스 - 로또 게임에서의 1장", () => {
  test("Ticket 1장은 자연수 중 1이상 45이하 6개로 이루어진 배열이다.", () => {
    // given
    const ticket = new Ticket({
      numbers: [1, 2, 3, 4, 5, 45],
    });

    // when
    const actualTicket = [1, 2, 3, 4, 5, 45];

    // then
    expect(actualTicket).toEqual(ticket.getNumbers);
  });

  test("1이상 45 이하를 제외한 값이 들어오면, '잘못된 입력입니다' 에러를 출력한다.", () => {
    // then
    expect(() => {
      const ticket = new Ticket({
        numbers: [1, 2, 3, 4, 55],
      });
    }).toThrow(ERROR_TICKET.WRONG_TICKET_INPUT);

    // then
    expect(() => {
      const ticket = new Ticket({
        numbers: [0, 5],
      });
    }).toThrow(ERROR_TICKET.WRONG_TICKET_INPUT);
  });

  test("로또 게임을 한판 할 수 있는 1장의 가격은 1000원이다.", () => {
    const ticket = new Ticket({
      numbers: [1, 2, 3, 4, 5, 45],
    });

    // when
    const actualTicketPriceResult = 1000;

    expect(actualTicketPriceResult).toBe(ticket.getPrice);
  });
});
