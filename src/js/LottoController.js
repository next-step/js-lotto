import { Lotto } from "../domain/Lotto";
import $ from "../utils/querySelector";
export default class LottoController {
  #lotto;

  constructor() {
    this.#lotto;
    this.init();
  }

  init() {
    this.initPurchasePrice();
  }

  initPurchasePrice() {
    $("#purchase_price_button").addEventListener("click", () => {
      const purchasePrice = $("#purchase_price_input").value;
      this.#lotto = new Lotto(purchasePrice);
    });
  }

  render() {}
}
