import { $ } from "../../../utils/dom.js";

let instance;
class PurchaseAmountInputForm {
  #$purchaseAmountInput;

  constructor(onSubmit) {
    if (instance) {
      return instance;
    }

    this.#$purchaseAmountInput = $(".purchase-amount-input");
    const $purchaseButton = $(".purchase-button");

    this.#$purchaseAmountInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (!this.isValidInput) {
          return;
        }
        onSubmit(e);
      }
    });
    $purchaseButton.addEventListener("click", onSubmit);

    instance = this;
  }

  get isValidInput() {
    return this.#$purchaseAmountInput.validity.valid;
  }

  get inputValue() {
    return this.#$purchaseAmountInput.value;
  }

  reset() {
    this.#$purchaseAmountInput.value = "";
  }
}

export default PurchaseAmountInputForm;
