import { LottoTicket } from "../src/js/LottoTicket";
import { LottoRetailer } from "../src/js/LottoRetailer";

describe("A lotto retailer sells lotto tickets for money", () => {
  const retailer = new LottoRetailer();
  it.each([
    [0, 0, 0],
    [500, 0, 500],
    [1000, 1, 0],
    [1500, 1, 500],
    [10000, 10, 0],
    [100000, 100, 0],
  ])(
    "should return correct number of lotto tickets and change",
    (money, expectedNumberOfTickets, expectedChange) => {
      const { tickets, change } = retailer.issueTicket(money);
      expect(tickets.length).toEqual(expectedNumberOfTickets);
      expect(change).toEqual(expectedChange);
      tickets.forEach((ticket) => {
        expect(ticket).toBeInstanceOf(LottoTicket);
      });
    }
  );
});
