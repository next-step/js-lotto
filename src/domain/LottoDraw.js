import { WINNING_PRIZES, lottoPrice } from "../utils/constants.js";
import Validator from "./Validator.js";

class LottoDraw {
  #result = {
    counts: {
      3: 0,
      4: 0,
      5: 0,
      "5Bonus": 0,
      6: 0,
    },
    rateOfReturn: 0,
  };
  #lottoNumbers = {};
  #lottoTickets = [];

  constructor(lottoNumbers, lottoTickets) {
    this.validateLottoNumbers(lottoNumbers);
    this.#lottoNumbers = lottoNumbers;
    this.#lottoTickets = lottoTickets;
  }

  start() {
    const ticketsCounts = this.getMatchedTicketStatus();
    this.calculateCount(ticketsCounts);
    this.calculateRateOfReturn();

    return this.#result;
  }

  calculateRateOfReturn() {
    const totalPrize = this.calculateWinningAmount();
    const ticketsPrice = this.#lottoTickets.length * lottoPrice;
    const rateOfReturn = totalPrize / ticketsPrice;

    this.#result.rateOfReturn = Math.round(rateOfReturn * 10) / 10;
  }

  calculateWinningAmount() {
    const { counts } = this.#result;
    const totalPrize = Object.entries(counts).reduce(
      (acc, [matchedCount, count]) => {
        const prize = WINNING_PRIZES[matchedCount] || 0;
        return acc + prize * count;
      },
      0
    );

    return totalPrize;
  }

  calculateCount(ticketsStatus) {
    ticketsStatus.forEach((ticket) => this.incrementCount(ticket));
  }

  incrementCount(ticketStatus) {
    const { counts } = this.#result;
    const matchConditions = {
      3: () => counts[3]++,
      4: () => counts[4]++,
      5: () => (ticketStatus.hasBonus ? counts["5Bonus"]++ : counts[5]++),
      6: () => counts[6]++,
    };

    const incrementFunction = matchConditions[ticketStatus.matchedCount];
    
    incrementFunction?.();
  }

  getMatchedTicketStatus() {
    return this.#lottoTickets.map((ticket) => {
      const matchedCount = this.countMatchedNumbers(ticket);
      const hasBonus = this.checkBonus(ticket);
      return { matchedCount, hasBonus };
    });
  }

  countMatchedNumbers(ticket) {
    const { lottoWinningNumbers } = this.#lottoNumbers;
    return ticket.numbers.filter((num) => lottoWinningNumbers.includes(num))
      .length;
  }

  checkBonus(ticket) {
    const { lottoBonusNumber } = this.#lottoNumbers;
    return ticket.numbers.includes(lottoBonusNumber);
  }

  validateLottoNumbers(lottoNumbers) {
    const { lottoWinningNumbers, lottoBonusNumber } = lottoNumbers;
    const validator = new Validator();

    validator.validateWinningNumbers([
      ...lottoWinningNumbers,
      lottoBonusNumber,
    ]);
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }

  get lottoTickets() {
    return this.#lottoTickets;
  }

  get result() {
    return this.#result;
  }
}

export default LottoDraw;
