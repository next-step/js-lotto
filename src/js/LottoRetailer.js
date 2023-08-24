import { LOTTO_TICKET_PRICE } from "./constants";
import { LottoTicket } from "./LottoTicket";
import { generateRandomLottoNumbers } from "./lotto";

export class LottoRetailer {
  issueTicket(money) {
    const numberOfTicketsToIssue = parseInt(money / LOTTO_TICKET_PRICE);
    const change = money % LOTTO_TICKET_PRICE;
    const tickets = Array.from({ length: numberOfTicketsToIssue }).map(
      () => new LottoTicket(generateRandomLottoNumbers())
    );
    return { tickets, change };
  }
}
