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

  #setEventHandler() {
    const purchaseButton = this.#view.getElement(SELECTOR.TICKET.FORM);
    this.#lottoEvents.purchaseLotto(purchaseButton, () => {
      this.#getTickets();
    });

    const ticketSection = this.#view.getElement(SELECTOR.TICKET.PURCHASED);
    this.#lottoEvents.toggleTicketNumber(ticketSection);
  }

  #getTickets() {
    const purchaseAmount = this.#view.readPurchaseAmount();
    const tickets = this.#lottoCorporation.buyTickets(purchaseAmount);
    this.#view.renderPurchasedTickets(tickets);
    this.#view.renderWinningNumbers();
  }

  // async #readWinningNumbers() {
  //   const winningNumbers = await this.#view.readWinningNumbers();

  //   return winningNumbers;
  // }

  // #checkTicketsResult(tickets, winningNumbers) {
  //   return this.#lottoCorporation.checkTicketsResult(tickets, winningNumbers);
  // }

  #renderTicketsResult(ticketResults) {
    this.#view.renderTicketsResult(ticketResults);
  }

  // async #readRestart() {
  //   const isRestart = await this.#view.readRestart();

  //   if (isRestart) return this.LottoGameProcess();

  //   this.#endGame();
  // }

  // #endGame() {
  //   this.#view.close();
  // }
}
