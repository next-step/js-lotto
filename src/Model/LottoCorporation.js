import { NUMBER } from '../constants';
import { LottoStore } from '../Model';
import { checkLottoPrize } from '../utils';

/**
 * 로또의 판매 및 Ticket 결과를 확인하는 객체입니다.
 */
export class LottoCorporation {
  #lottoStore = new LottoStore();

  buyTickets(purchaseAmount) {
    return this.#lottoStore.buyTickets(purchaseAmount);
  }

  checkTicketsResult(tickets, winningNumbers) {
    const prizes = tickets.map((ticket) => {
      const ticketNumbers = ticket.getTicketNumbers();

      return this.#checkTicketPrize(ticketNumbers, winningNumbers);
    });

    const totalPrize = prizes.reduce((acc, curr) => acc + curr.prize, 0);
    const profitRate = this.#getTotalPrize(totalPrize, tickets.length);

    return { prizes, profitRate };
  }

  #getTotalPrize(totalPrize, ticketAmount) {
    return (totalPrize / (ticketAmount * NUMBER.DEFAULT_TICKET_PRICE)) * 100;
  }

  #checkTicketPrize(ticketNumbers, winningNumbers) {
    const { matchingCount, isBonusMatched } = this.#checkNumberMatch(
      ticketNumbers,
      winningNumbers
    );

    const prize = checkLottoPrize(matchingCount, isBonusMatched);

    return { matchingCount, isBonusMatched, prize };
  }

  #checkNumberMatch(ticketNumbers, winningNumbers) {
    const { lottoNumbers, bonusNumber } = winningNumbers;

    const matchingCount = ticketNumbers.filter((number) =>
      lottoNumbers.includes(number)
    ).length;
    const isBonusMatched = ticketNumbers.includes(bonusNumber);

    return { matchingCount, isBonusMatched };
  }
}
