import { LottoCorporation } from '../Model/LottoCorporation';
import { KEY } from '../constants';

export class WebController {
  #view;
  #lottoCorporation = new LottoCorporation();
  #storage = new Map();

  constructor(view) {
    this.#view = view;
    this.#bindEvent();
  }

  #bindEvent() {
    this.#view.bindEvent({
      getTickets: () => this.#getTickets(),
      checkTicketsResult: () => this.#checkTicketsResult(),
      restartGame: () => this.#restartGame(),
    });
  }

  async #getTickets() {
    const purchaseAmount = await this.#view.readPurchaseAmount();

    if (purchaseAmount === null) return;

    const tickets = this.#buyTickets(purchaseAmount);

    this.#renderTickets(tickets);
    this.#renderReadWinningNumbers();

    this.#storage.set(KEY.TICKETS, tickets);
  }

  #buyTickets(purchaseAmount) {
    return this.#lottoCorporation.buyTickets(purchaseAmount);
  }

  #renderTickets(tickets) {
    this.#view.renderPurchasedTickets(tickets);
  }

  #renderReadWinningNumbers() {
    this.#view.renderReadWinningNumbers();
  }

  async #checkTicketsResult() {
    const tickets = this.#storage.get(KEY.TICKETS);
    const { lottoNumbers, bonusNumber } = await this.#view.readWinningNumbers();

    if (lottoNumbers === null || bonusNumber === null) return;

    const ticketResults = this.#lottoCorporation.checkTicketsResult(tickets, {
      lottoNumbers,
      bonusNumber,
    });

    this.#renderTicketsResult(ticketResults);
  }

  #renderTicketsResult(ticketResults) {
    this.#view.renderTicketsResult(ticketResults);
  }

  async #restartGame() {
    this.#view.closeModal();
    this.#storage = new Map();
    this.#view.resetView();
  }
}
