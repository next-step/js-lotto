export class GameController {
  #view;

  constructor(view) {
    this.#view = view;
  }

  configStore() {
    this.#visitStore();
  }

  async #visitStore() {
    const purchaseAmount = await this.#view.readPurchaseAmount();
  }
}
