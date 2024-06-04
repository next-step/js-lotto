import { $ } from "../../../utils/dom.js";
import LottoShop from "../../domain/LottoShop.js";

let enterPressed = false;

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

  addEventListener(element, event, handler, callback = () => {}) {
    element.addEventListener(event, handler.bind(this, callback));
  },

  handlePurchaseAmountInputFormEnterPressed(callback, e) {
    if (e.key === "Enter") {
      enterPressed = true;
      if (!PurchaseAmountInputForm.isValidInput()) {
        return;
      }
      callback(e);
    }
  },

  handlePurchaseAmountInputFormBlur(_, e) {
    try {
      // Enter 키로 인한 blur 이벤트 발생 시, 중복으로 validate 되는 것을 방지
      if (enterPressed) {
        enterPressed = false;
        return;
      }

      if (
        e.relatedTarget === PurchaseAmountInputForm.elements.PURCHASE_BUTTON
      ) {
        return;
      }

      LottoShop.validateLottoPurchasedAmount(
        PurchaseAmountInputForm.inputValue()
      );
    } catch (error) {
      alert(error.message);
      PurchaseAmountInputForm.reset();
    }
  },
};

export default PurchaseAmountInputForm;
