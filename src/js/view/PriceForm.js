import View from "./view.js";
import {$, $$} from "../utils.js";
import {DOM_ID} from "../constants.js";

export default class PriceForm extends View {
  constructor() {
    super();
    this.$moneyInput = $(DOM_ID.MONEY_INPUT);
    this.$priceForm = $(DOM_ID.PRICE_FORM);
    this.$purchaseMessage = $(DOM_ID.PURCHASE_MESSAGE);
  }

  clearInput() {
    this.$moneyInput.value = '';
  }

  updatePurchaseMessage(amount) {
    this.$purchaseMessage.innerHTML = `총 ${amount}개를 구매하였습니다.`;
  }

  bindOnClickPurchaseButton(handler) {
    this.$priceForm.addEventListener('submit', event => {
      event.preventDefault();
      handler(event);
    });
  }
};