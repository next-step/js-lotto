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
    this.initLottosToggle();
  }

  initPurchasePrice() {
    $("#purchase_price_button").addEventListener("click", (e) => {
      const purchasePrice = $("#purchase_price_input").value;
      this.#lotto = new Lotto(purchasePrice);
      if ($("#lottos_toggle_button").checked === false) {
        $("#lotto_result_box").classList.add("d-none");
      }
      output.lottoResult(this.#lotto.lottos);
    });
  }

  initLottosToggle() {
    $("#lottos_toggle_button").addEventListener("click", (e) => {
      console.log($("#lottos_toggle_button").checked);
      $("#lotto_result_box").classList.toggle("d-none");
    });
  }
}
