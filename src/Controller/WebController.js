import { LottoCorporation } from '../Model/LottoCorporation';

export class WebController {
  #view;
  #lottoCorporation = new LottoCorporation();

  constructor(view) {
    this.#view = view;
    this.#bindEvent();
  }

  #bindEvent() {
    //이건 View로 넘겨야 할 듯
    const purchaseButton = document.querySelector('#purchase-button');
    purchaseButton.addEventListener('click', () => {
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
