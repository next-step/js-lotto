import { Store } from '../Model';
import { PRODUCTS, PRODUCTS_NAME } from '../constants';

export class GameController {
  #view;
  #store;

  constructor(view) {
    this.#view = view;
    this.#store = new Store(PRODUCTS);
  }

  async buyTickets() {
    const purchaseAmount = await this.#view.readPurchaseAmount();
    const tickets = this.#store.buyProduct(
      PRODUCTS_NAME.LOTTO_TICKET,
      purchaseAmount
    );
  }
}
