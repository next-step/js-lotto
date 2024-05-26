import { Lotto } from "../domain/Lotto";
import { LottoGame } from "../domain/LottoGame";
import { $, $$ } from "../utils/querySelector";
import { output } from "../view/web/output";

export default class LottoController {
  #lotto;
  #lottoGame;

  constructor() {
    this.#lotto;
    this.#lottoGame;
  }

  init() {
    this.initPurchasePrice();
    this.initLottosToggle();
    this.initLottoGameResult();
  }

  initPurchasePrice() {
    $("#purchase_price_form").addEventListener("submit", (e) => {
      e.preventDefault();
      const purchasePrice = $("#purchase_price_input").value;
      this.#lotto = new Lotto(purchasePrice);
      this.disabledPurchasePrice();
      if ($("#lottos_toggle_button").checked === false) {
        $("#lotto_result_box").classList.add("d-none");
      }
      this.outputLottoResult();
    });
  }

  disabledPurchasePrice() {
    $("#purchase_price_input").disabled = true;
    $("#purchase_price_button").disabled = true;
  }

  outputLottoResult() {
    output.lottosCount(this.#lotto.lottos.length);
    output.lottoResult(this.#lotto.lottos);
  }

  initLottosToggle() {
    $("#lottos_toggle_button").addEventListener("click", () => {
      $("#lotto_result_box").classList.toggle("d-none");
    });
  }

  initLottoGameResult() {
    $("#result_form").addEventListener("submit", (e) => {
      e.preventDefault();
      const winningNumber = [...$$(".winning-number")].map((input) => Number(input.value));
      const bonusNumber = Number($(".bonus-number").value);
      this.#lottoGame = new LottoGame(this.#lotto.lottos, winningNumber, bonusNumber);
      output.lottoGameResult(this.#lottoGame.result);
    });
    // this.outputLottoGameResult();
  }

  get lottos() {
    return this.#lotto.lottos;
  }
}
