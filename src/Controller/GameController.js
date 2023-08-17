export class GameController {
  #view;
  #lottoCorporation;

  constructor(view, lottoCorporation) {
    this.#view = view;
    this.#lottoCorporation = lottoCorporation;
  }

  /* Lotto Game Process */
  async LottoGameProcess() {
    const tickets = await this.#getTickets();
    const winningNumbers = await this.#readWinningNumbers();
    const ticketResults = this.#checkTicketsResult(tickets, winningNumbers);
    this.#printTicketsResult(ticketResults);
    this.#readRestart();
  }

  /* Get Lotto Tickets */
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

  /* Read Lotto Winning numbers */
  async #readWinningNumbers() {
    const winningNumbers = await this.#view.readWinningNumbers();

    return winningNumbers;
  }

  /* Check Tickets Result */
  #checkTicketsResult(tickets, winningNumbers) {
    const ticketResults = tickets.map((ticket) =>
      this.#lottoCorporation.checkTicketResult(ticket, winningNumbers)
    );

    return ticketResults;
  }

  /* Print Tickets Result */
  #printTicketsResult(ticketResults) {
    this.#view.printTicketsResult(ticketResults);
  }

  /* Read Restart */
  async #readRestart() {
    const restart = await this.#view.readRestart();

    if (restart) return this.LottoGameProcess();

    this.#endGame();
  }

  #endGame() {
    this.#view.close();
  }
}
