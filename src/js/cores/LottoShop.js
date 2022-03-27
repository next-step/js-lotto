import { LottoTicket, LottoMoney, LottoWinningTicket } from './index.js';

import { PRICE, MIN_WINNING_COUNT } from '../constants/index.js';

export class LottoShop {
  money = 0;
  results = new Map([
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
  ]);
  winningTicket;
  tickets = [];
  isShowTickets = false;

  restart() {
    this.money = 0;
    this.results = new Map([
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
    ]);
    this.winningTicket = undefined;
    this.tickets = [];
    this.isShowTickets = false;
  }

  inputMoney(money) {
    this.money = new LottoMoney(money);

    this.issueTickets();
  }

  inputWinningNumbers(winningNumbers) {
    this.winningTicket = new LottoWinningTicket(winningNumbers);

    this.checkTicketsWithWinningNumbers();
  }

  checkTicketsWithWinningNumbers() {
    const winningNumbers = this.winningTicket.getWinningNumbers();

    this.tickets.forEach((ticket) => {
      let sameNumbers = 0;
      const numbers = ticket.getNumbers();

      numbers.forEach((number) => {
        if (winningNumbers.includes(number)) sameNumbers++;
      });

      if (sameNumbers >= MIN_WINNING_COUNT && this.results.has(sameNumbers))
        this.results.set(sameNumbers, this.results.get(sameNumbers) + 1);
    });
  }

  getTickets() {
    return [...this.tickets];
  }

  getIsShowTickets() {
    return this.isShowTickets;
  }

  getResults() {
    return new Map(this.results);
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
