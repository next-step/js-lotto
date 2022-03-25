import { LottoTicket } from './';

export class LottoShop {
  money;
  tickets = [];

  constructor() {}

  setMoney(money) {
    this.money = money;
  }

  issueTickets(money) {
    const ticketCount = money / 1000;

    for (let i = 0; i < ticketCount; i++) {
      this.tickets.push(new LottoTicket());
    }
  }
}
