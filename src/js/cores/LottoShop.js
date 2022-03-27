import { LottoTicket, LottoWinningTicket, LottoResults } from './index.js';

import {
  PRICE,
  MIN_WINNING_COUNT,
  FIVE_PLUS_BONUS,
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
      const numbers = ticket.getNumbers();
      const sameCounts = this.results.getSameCounts();
      let sameNumbers = 0;
      let checkedBonusNumber = false;

      numbers.forEach((number) => {
        if (number === bonusNumber) return (checkedBonusNumber = true);

        if (winningNumbers.includes(number)) sameNumbers++;
      });

      if (
        checkedBonusNumber &&
        sameNumbers === 5 &&
        sameCounts.has(FIVE_PLUS_BONUS)
      )
        return this.results.updateSameCounts(FIVE_PLUS_BONUS);

      if (sameNumbers >= MIN_WINNING_COUNT && sameCounts.has(sameNumbers))
        this.results.updateSameCounts(sameNumbers);
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
