import { PRODUCTS_NAME } from '../constants';

export class LottoCorporation {
  #lottoStore;
  #ticketWinningChecker;

  constructor(lottoStore, ticketWinningChecker) {
    this.#lottoStore = lottoStore;
    this.#ticketWinningChecker = ticketWinningChecker;
  }

  buyTickets(purchaseAmount) {
    const tickets = this.#lottoStore.buyProduct(
      PRODUCTS_NAME.LOTTO_TICKET,
      purchaseAmount
    );

    return tickets;
  }

  checkTicketResult(ticket, winningNumbers) {}
}
