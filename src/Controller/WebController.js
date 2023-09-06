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
      readWinningNumbers: () => this.#readWinningNumbers(),
      checkTicketsResult: () => this.#checkTicketsResult(),
    });
  }

  async #getTickets() {
    const purchaseAmount = await this.#view.readPurchaseAmount();
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

  async #readWinningNumbers() {
    const winningNumbers = await this.#view.readWinningNumbers();

    this.#storage.set(KEY.WINNING_NUMBERS, winningNumbers);
  }

  #checkTicketsResult() {
    const tickets = this.#storage.get(KEY.TICKETS);
    const winningNumbers = this.#storage.get(KEY.WINNING_NUMBERS);

    const ticketResults = this.#lottoCorporation.checkTicketsResult(
      tickets,
      winningNumbers
    );
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
