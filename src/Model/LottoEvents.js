import { EventBinder } from './EventBinder';

export class LottoEvents {
  #eventBinder;

  constructor() {
    this.#eventBinder = new EventBinder();
  }

  purchaseLotto(purchaseButton, getTickets) {
    this.#eventBinder.onSubmit(purchaseButton, getTickets);
  }
}
