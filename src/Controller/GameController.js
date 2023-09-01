import { LottoCorporation } from '../Model';

export class GameController {
  #view;
  #lottoCorporation = new LottoCorporation();

  constructor(view) {
    this.#view = view;
  }

  async LottoGameProcess() {
    const tickets = await this.#getTickets();
    const winningNumbers = await this.#readWinningNumbers();
    const ticketResults = this.#checkTicketsResult(tickets, winningNumbers);

    this.#printTicketsResult(ticketResults);
    this.#readRestart();
  }

  async #getTickets() {
    const purchaseAmount = await this.#view.readPurchaseAmount();
    const tickets = this.#buyTickets(purchaseAmount);

    this.#printTickets(tickets);

    return tickets;
  }

  #buyTickets(purchaseAmount) {
    const tickets = this.#lottoCorporation.buyTickets(purchaseAmount);

    return tickets;
  }

  #printTickets(tickets) {
    this.#view.printPurchasedTickets(tickets);
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
