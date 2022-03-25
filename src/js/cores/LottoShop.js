import { LottoTicket } from './LottoTicket.js';

import { PRICE } from '../constants/index.js';

export class LottoShop {
  money = 0;
  tickets = [];

  constructor() {}

  inputMoney(money) {
    this.setMoney(money);
    this.issueTickets(money);
  }

  setMoney(money) {
    this.money = money;
  }

  issueTickets(money) {
    const ticketCount = money / PRICE;

    for (let i = 0; i < ticketCount; i++) {
      this.tickets.push(new LottoTicket());
    }

    console.log(this.tickets);
  }
}
