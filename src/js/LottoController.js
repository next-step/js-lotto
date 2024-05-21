import { Lotto } from "../domain/Lotto";
import $ from "../utils/querySelector";
import { output } from "../view/web/output";

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
    $("#purchase_price_button").addEventListener("click", (e) => {
      const purchasePrice = $("#purchase_price_input").value;
      this.#lotto = new Lotto(purchasePrice);
      e.target.disabled = true;
      output.lottoResult(this.#lotto.lottos);
    });
  }
}
