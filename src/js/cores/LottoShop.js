import { LottoTicket } from './';

import { LOTTO_PRICE } from '../constants';

export class LottoShop {
  money = 0;
  tickets = [];

  constructor() {}

  setMoney(money) {
    this.money = money;
  }

  issueTickets(money) {
    const ticketCount = money / LOTTO_PRICE;

    for (let i = 0; i < ticketCount; i++) {
      this.tickets.push(new LottoTicket());
    }
  }
}
