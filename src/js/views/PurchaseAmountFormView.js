import { selector } from "../utils/common.js";
import View from "./View.js";

class PurchaseAmountFormView extends View {
  tag = "PurchaseAmountFormView";
  constructor() {
    super();
    this.$inputPurchaseAmount = selector("#InputPurchaseAmount");
  }

  bindEvent() {
    this.on('submit', e => {
      e.preventDefault();

      this.emit("submit.updateAmount", { price: this.$inputPurchaseAmount.value });
    });
  }

  initValue() {
    this.$inputPurchaseAmount.value = null;
    return this;
  }
}

export default new PurchaseAmountFormView();
