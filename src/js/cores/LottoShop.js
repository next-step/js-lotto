import { LottoTicket, LottoWinningTicket, LottoResults } from './index.js';

import {
  PRICE,
  MIN_WINNING_COUNT,
  SECOND_PLACE,
  THIRD_PLACE,
} from '../constants/index.js';

export class LottoShop {
  money = 0;
  results = new LottoResults();
  winningTicket;
  tickets = [];
  isShowTickets = false;

  restart() {
    this.money = 0;
    this.results = new LottoResults();
    this.winningTicket = undefined;
    this.tickets = [];
    this.isShowTickets = false;
  }

  inputMoney(money) {
    this.money = money;

    this.results.setMoney(money);
    this.issueTickets();
  }

  inputWinningNumbers(winningNumbers, bonusNumber) {
    this.winningTicket = new LottoWinningTicket(winningNumbers, bonusNumber);

    this.updateResults();
  }

  updateResults() {
    const winningNumbers = this.winningTicket.getWinningNumbers();
    const bonusNumber = this.winningTicket.getBonusNumber();

    this.tickets.forEach((ticket) => {
      const ticketNumbers = ticket.getNumbers();
      const sameCounts = this.results.getSameCounts();
      const sameNumbers = ticketNumbers.filter((number) => {
        return winningNumbers.includes(number);
      });
      const isBonusNumber = ticketNumbers.includes(bonusNumber);

      if (
        isBonusNumber &&
        sameNumbers.length === THIRD_PLACE &&
        sameCounts.has(SECOND_PLACE)
      )
        return this.results.updateSameCounts(SECOND_PLACE);

      if (
        sameNumbers.length >= MIN_WINNING_COUNT &&
        sameCounts.has(sameNumbers.length)
      )
        this.results.updateSameCounts(sameNumbers.length);
    });

    this.results.calculateRateOfReturn();
  }

  getTickets() {
    return [...this.tickets];
  }

  getIsShowTickets() {
    return this.isShowTickets;
  }

  getResults() {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this.results)),
      this.results
    );
  }

  toggleIsShowTickets() {
    this.isShowTickets = !this.isShowTickets;
  }

  issueTickets() {
    const ticketCount = this.money / PRICE;

    for (let i = 0; i < ticketCount; i++) {
      this.tickets.push(new LottoTicket());
    }
  }
}
