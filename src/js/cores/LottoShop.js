import { LottoTicket, LottoWinningTicket } from './index.js';

import {
  PRICE,
  MIN_WINNING_COUNT,
  FIVE_PLUS_BONUS,
} from '../constants/index.js';

export class LottoShop {
  money = 0;
  results = new Map([
    [3, 0],
    [4, 0],
    [5, 0],
    [FIVE_PLUS_BONUS, 0],
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
      [FIVE_PLUS_BONUS, 0],
      [6, 0],
    ]);
    this.winningTicket = undefined;
    this.tickets = [];
    this.isShowTickets = false;
  }

  inputMoney(money) {
    this.money = money;

    this.issueTickets();
  }

  inputWinningNumbers(winningNumbers, bonusNumber) {
    this.winningTicket = new LottoWinningTicket(winningNumbers, bonusNumber);

    this.checkTicketsWithWinningNumbers();
  }

  checkTicketsWithWinningNumbers() {
    const winningNumbers = this.winningTicket.getWinningNumbers();
    const bonusNumber = this.winningTicket.getBonusNumber();

    this.tickets.forEach((ticket) => {
      let sameNumbers = 0;
      let checkedBonusNumber = false;
      const numbers = ticket.getNumbers();

      numbers.forEach((number) => {
        if (number === bonusNumber) return (checkedBonusNumber = true);

        if (winningNumbers.includes(number)) sameNumbers++;
      });

      if (
        checkedBonusNumber &&
        sameNumbers === 5 &&
        this.results.has(FIVE_PLUS_BONUS)
      ) {
        this.results.set(
          FIVE_PLUS_BONUS,
          this.results.get(FIVE_PLUS_BONUS) + 1
        );

        return;
      }

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
    const ticketCount = this.money / PRICE;

    for (let i = 0; i < ticketCount; i++) {
      this.tickets.push(new LottoTicket());
    }
  }
}
