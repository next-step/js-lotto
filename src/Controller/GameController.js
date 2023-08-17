import { Store } from '../Model';
import { PRODUCTS, PRODUCTS_NAME } from '../constants';

export class GameController {
  #view;
  #store;

  constructor(view) {
    this.#view = view;
    this.#store = new Store(PRODUCTS);
  }

  /* Lotto Game Process */
  async LottoGameProcess() {
    const tickets = await this.#getTickets();
    const winningNumbers = await this.#readWinningNumbers();
    this.#checkTicketsResult(tickets, winningNumbers);
  }

  /* Get Lotto Tickets */
  async #getTickets() {
    const purchaseAmount = await this.#view.readPurchaseAmount();
    const tickets = this.#buyTickets(purchaseAmount);

    this.#printTickets(tickets);

    return tickets;
  }

  #buyTickets(purchaseAmount) {
    const tickets = this.#store.buyProduct(
      PRODUCTS_NAME.LOTTO_TICKET,
      purchaseAmount
    );

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
  async #checkTicketsResult(tickets, winningNumbers) {}
}
