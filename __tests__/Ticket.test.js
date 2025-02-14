import Ticket from "../src/domain/Ticket.js";

describe("Ticket 클래스 - 로또 게임에서의 1장", () => {
  test("[1-1] 로또 1장은 자연수 중 1이상 45이하 6개로 이루어진 배열이다.", () => {
    // given
    const ticket = new Ticket({
      numbers: [1, 2, 3, 4, 5, 45],
    });

    // when
    const actualTicket = [1, 2, 3, 4, 5, 45];

    // then
    expect(actualTicket).toEqual(ticket.getNumbers);
  });

  // test("[1-1-a] 로또 1장은 자연수 중 1이상 45이하 6개로 이루어진 배열이다.", () => {
  //   // given

  //   // then
  //   expect(() => {
  //     const ticket = new Ticket({
  //       numbers: [0, 1, 2],
  //     });
  //   }).toThrow();
  //   expect(actualTicket).toEqual(ticket.getNumbers);
  // });
});
