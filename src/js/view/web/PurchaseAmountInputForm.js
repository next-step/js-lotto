import { $ } from "../../../utils/dom.js";

const PurchaseAmountInputForm = {
  elements: {
    PURCHASE_AMOUNT_INPUT: $(".purchase-amount-input"),
    PURCHASE_BUTTON: $(".purchase-button"),
  },

  isValidInput() {
    return this.elements.PURCHASE_AMOUNT_INPUT.validity.valid;
  },

  inputValue() {
    return this.elements.PURCHASE_AMOUNT_INPUT.value;
  },

  reset() {
    this.elements.PURCHASE_AMOUNT_INPUT.value = "";
  },
};

export default PurchaseAmountInputForm;
