import { $, $$ } from "../utils/common.js";
import View from "./View.js";

class PurchaseAmountFormView extends View {
  tag = "PurchaseAmountFormView";
  constructor() {
    super();
    this.$inputPurchaseAmount = $("#InputPurchaseAmount");
    this.$manualRadioButtons = $$("input[type='radio']", this.$elem);
  }

  bindEvent() {
    this.on('submit', e => {
      e.preventDefault();

      this.emit("submit.updateAmount", {
        price: this.$inputPurchaseAmount.value,
        selectedProcess: [...this.$manualRadioButtons]
          .find($elem => $elem.checked)
          .dataset.process
      });
    });
  }

  initValue(val = null) {
    this.$inputPurchaseAmount.value = val;
    return this;
  }
}

export default new PurchaseAmountFormView();
