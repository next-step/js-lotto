import { LottoCorporation } from '../Model/LottoCorporation';
import { LottoEvents } from '../Model/LottoEvents';
import { SELECTOR } from '../constants';

export class WebController {
  #view;
  #lottoCorporation = new LottoCorporation();
  #lottoEvents = new LottoEvents();

  constructor(view) {
    this.#view = view;
    this.#setEventHandler();
  }

  // event binding layer View쪽으로 몰아주는 것 고려해보기.
  #setEventHandler() {
    const purchaseButton = this.#view.getElement(SELECTOR.TICKET.FORM);
    this.#lottoEvents.purchaseLotto(purchaseButton, () => {
      this.#getTickets();
    });

    const ticketSection = this.#view.getElement(SELECTOR.TICKET.PURCHASED);
    this.#lottoEvents.toggleTicketNumber(ticketSection);
  }

  async #getTickets() {
    const purchaseAmount = await this.#view.readPurchaseAmount();
    const tickets = this.#buyTickets(purchaseAmount);

    this.#renderTickets(tickets);

    return tickets;
  }

  #buyTickets(purchaseAmount) {
    const tickets = this.#lottoCorporation.buyTickets(purchaseAmount);

    return tickets;
  }

  #renderTickets(tickets) {
    this.#view.renderPurchasedTickets(tickets);
  }

  async #readWinningNumbers() {
    const winningNumbers = await this.#view.readWinningNumbers();

    return winningNumbers;
  }

  #checkTicketsResult(tickets, winningNumbers) {
    return this.#lottoCorporation.checkTicketsResult(tickets, winningNumbers);
  }

  #printTicketsResult(ticketResults) {
    this.#view.printTicketsResult(ticketResults);
  }

  async #readRestart() {
    const isRestart = await this.#view.readRestart();

    if (isRestart) return this.LottoGameProcess();

    this.#endGame();
  }

  #endGame() {
    this.#view.close();
  }
}
