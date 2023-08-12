export class GameController {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async visitStore() {
    const purchaseAmount = await this.#view.readPurchaseAmount();
  }
}
