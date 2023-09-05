import { LottoCorporation } from '../Model/LottoCorporation';
import { SELECTOR } from '../constants';

export class WebController {
  #view;
  #lottoCorporation = new LottoCorporation();

  constructor(view) {
    this.#view = view;
    this.#setEventHandler();
  }

  #setEventHandler() {
    const purchaseButton = this.#view.getElement(SELECTOR.TICKET_FORM);
    purchaseButton.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#getTickets();
    });

    const ticketSection = this.#view.getElement(SELECTOR.PURCHASED_TICKET);
    ticketSection.addEventListener('change', (event) => {
      if (event.target.matches('.lotto-numbers-toggle-button')) {
        const lottoNumbersElements =
          document.querySelectorAll('.lotto-numbers');

        lottoNumbersElements.forEach(($element) => {
          $element.style.display = event.target.checked ? 'block' : 'none';
        });
      }
    });
  }

  #getTickets() {
    const purchaseAmount = this.#view.readPurchaseAmount();
    const tickets = this.#lottoCorporation.buyTickets(purchaseAmount);
    this.#view.renderPurchasedTickets(tickets);
  }

  /*
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

  
  */
}
