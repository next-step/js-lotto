import { Lotto } from "../domain/Lotto";
import { LottoGame } from "../domain/LottoGame";
import calculateRateOfReturn from "../utils/calculateRateOfReturn";
import { $, $$ } from "../utils/querySelector";
import { validateArray } from "../validator/validateArray";
import { validateNumber } from "../validator/validateNumber";
import { output } from "../view/web/output";

export default class LottoController {
  #lotto;
  #lottoGame;
  #purchasePrice;

  constructor() {
    this.#lotto;
    this.#lottoGame;
    this.#purchasePrice;
  }

  init() {
    this.initPurchasePrice();
    this.initLottosToggle();
    this.initLottoGameResult();
  }

  initPurchasePrice() {
    $("#purchase_price_form").addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        this.validatePurchasePrice($("#purchase_price_input").value);
        this.#purchasePrice = $("#purchase_price_input").value;
        this.#lotto = new Lotto(this.#purchasePrice);
        this.disabledPurchasePrice();
        if ($("#lottos_toggle_button").checked === false) {
          $("#lotto_result_box").classList.add("d-none");
        }
        this.outputLottoResult();
        $("#result_button").disabled = false;
      } catch (error) {
        alert(error.message);
      }
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
      this.handleLottoGameResult();
    });
  }

  handleLottoGameResult() {
    try {
      const winningNumber = [...$$(".winning-number")].map((input) => Number(input.value));
      const bonusNumber = Number($(".bonus-number").value);
      this.#lottoGame = new LottoGame(this.#lotto.lottos, winningNumber, bonusNumber);
      output.lottoGameResult(this.#lottoGame.result);
      const rateOfReturn = calculateRateOfReturn(this.#lottoGame.totalIncome, this.#purchasePrice);
      output.rateOfReturn(rateOfReturn);
    } catch (erorr) {
      alert(erorr.message);
    }
  }

  validatePurchasePrice(purchasePrice) {
    validateNumber.nan(purchasePrice);
    validateNumber.negative(purchasePrice);
  }
}
