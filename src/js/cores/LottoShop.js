import { LottoTicket, LottoMoney, LottoWinningTicket } from './index.js';

import { PRICE } from '../constants/index.js';

export class LottoShop {
  money;
  winningTicket;
  tickets = [];
  isShowTickets = false;

  inputMoney(money) {
    this.money = new LottoMoney(money);

    this.issueTickets();
  }

  inputWinningNumbers(winningNumbers) {
    this.winningTicket = new LottoWinningTicket(winningNumbers);
  }

  compareWithTickets() {}

  getTickets() {
    return [...this.tickets];
  }

  getIsShowTickets() {
    return this.isShowTickets;
  }

  toggleIsShowTickets() {
    this.isShowTickets = !this.isShowTickets;
  }

  clearTickets() {
    this.tickets = [];
  }

  issueTickets() {
    const ticketCount = this.money.getMoney() / PRICE;

    for (let i = 0; i < ticketCount; i++) {
      this.tickets.push(new LottoTicket());
    }
  }
}
