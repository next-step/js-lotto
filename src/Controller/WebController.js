import { LottoCorporation } from '../Model/LottoCorporation';
import { SELECTOR } from '../constants';

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
      readWinningNumbers: () => this.#readWinningNumbers(),
    });
  }

  async #getTickets() {
    const purchaseAmount = await this.#view.readPurchaseAmount();
    const tickets = this.#buyTickets(purchaseAmount);

    this.#renderTickets(tickets);
    this.#renderReadWinningNumbers();
    this.#storage.set('tickets', tickets);
  }

  #buyTickets(purchaseAmount) {
    const tickets = this.#lottoCorporation.buyTickets(purchaseAmount);

    return tickets;
  }

  #renderTickets(tickets) {
    this.#view.renderPurchasedTickets(tickets);
  }

  #renderReadWinningNumbers() {
    this.#view.renderReadWinningNumbers();
  }

  async #readWinningNumbers() {
    const winningNumbers = await this.#view.readWinningNumbers();

    console.log(winningNumbers, '!!');
  }

  #checkTicketsResult(tickets, winningNumbers) {
    return this.#lottoCorporation.checkTicketsResult(tickets, winningNumbers);
  }

  #renderTicketsResult(ticketResults) {
    this.#view.renderTicketsResult(ticketResults);
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
