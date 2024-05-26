import { $ } from "../../../utils/dom.js";

const PurchaseAmountInputForm = {
  selector: {
    PURCHASE_AMOUNT_INPUT: $(".purchase-amount-input"),
    PURCHASE_BUTTON: $(".purchase-button"),
  },

  isValidInput() {
    return this.selector.PURCHASE_AMOUNT_INPUT.validity.valid;
  },

  inputValue() {
    return this.selector.PURCHASE_AMOUNT_INPUT.value;
  },

  reset() {
    this.selector.PURCHASE_AMOUNT_INPUT.value = "";
  },
};

export default PurchaseAmountInputForm;
