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
    $("#purchase_price_form").addEventListener("submit", (e) => {
      e.preventDefault();
      const purchasePrice = $("#purchase_price_input").value;
      $("#purchase_price_input").disabled = true;
      $("#purchase_price_button").disabled = true;
      this.#lotto = new Lotto(purchasePrice);
      if ($("#lottos_toggle_button").checked === false) {
        $("#lotto_result_box").classList.add("d-none");
      }
      output.lottosCount(this.#lotto.lottos.length);
      output.lottoResult(this.#lotto.lottos);
    });
  }

  initLottosToggle() {
    $("#lottos_toggle_button").addEventListener("click", (e) => {
      console.log(e.target.checked);
      $("#lotto_result_box").classList.toggle("d-none");
    });
  }
}
