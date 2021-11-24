import { selector } from "../utils/common.js";
import View from "./View.js";

class PurchaseAmountFormView extends View {
  tag = "PurchaseAmountFormView";
  constructor() {
    super();
  }

  bindEvent() {
    this.on('submit', e => {
      e.preventDefault();

      this.emit("submit.updateAmount", { price: selector("#InputPurchaseAmount").value });
    });
  }
}

export default new PurchaseAmountFormView();
