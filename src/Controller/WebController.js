import { LottoCorporation } from '../Model/LottoCorporation';

export class WebController {
  #view;
  #lottoCorporation = new LottoCorporation();

  constructor(view) {
    this.#view = view;
    this.#bindEvent();
  }

  #bindEvent() {
    document.querySelector('#purchaseButton').addEventListener('click', () => {
      this.#getTickets();
    });
  }

  #getTickets() {
    const purchaseAmount = this.#view.readPurchaseAmount();
    const tickets = this.#lottoCorporation.buyTickets(purchaseAmount);
    console.log(tickets);
    this.#view.renderPurchasedTickets(tickets);
  }
}
