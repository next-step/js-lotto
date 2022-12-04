import { LOTTO, MESSAGES } from "./constants.js";
import LottoController from "./controllers/LottoController.js";

class LottoMachine {
  #lottoController;

  constructor() {
    this.$purchaseForm = document.getElementById("purchase-form");
    this.$purchaseAmountInput = document.getElementById(
      "purchase-amount-input"
    );

    this.#lottoController = new LottoController();
    this.#initEvents();
  }

  #initEvents() {
    this.$purchaseForm.addEventListener("submit", this.#onPurchase.bind(this));
  }

  #onPurchase(event) {
    event.preventDefault();

    const purchasePrice = this.$purchaseAmountInput.value;
    if (this.isUnavailablePurchasePrice(+purchasePrice)) {
      window.alert(MESSAGES.WRONG_PURCHASE_PRICE);
      return;
    }

    if (this.isExceedPurchasePriceLimit(+purchasePrice)) {
      window.alert(MESSAGES.WRONG_PURCHASE_PRICE);
      return;
    }

    const purchaseAmount = this.calculateAmountPer(purchasePrice);
    this.#lottoController.onGenerateLottosBy(purchaseAmount);
  }

  calculateAmountPer(purchasePrice) {
    return purchasePrice / 1000;
  }

  isUnavailablePurchasePrice(purchasePrice) {
    return purchasePrice === 0 || purchasePrice % 1000 !== 0;
  }

  isExceedPurchasePriceLimit(purchasePrice) {
    return purchasePrice > LOTTO.LIMIT_PURCHASE_PRICE;
  }
}

export default LottoMachine;
