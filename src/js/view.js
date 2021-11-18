import {DOM_ID} from "./constants.js";
import {$} from "./utils.js";

export default class View {
  constructor() {
    this.$toggleButton = $(DOM_ID.TOGGLE_BUTTON);
    this.$purchaseButton = $(DOM_ID.PURCHASE_BUTTON);
    this.$purchaseMessage = $(DOM_ID.PURCHASE_MESSAGE);
    this.$lottoInfo = $(DOM_ID.LOTTO_INFO);
    // this.$inputMoney = document.querySelector("#inputMoney");
    this.$inputMoney = $(DOM_ID.INPUT_MONEY);
  }

  displayLottos() {
    console.log('view.displayLottos');
  }

  createElement(tag, className) {
    console.log('view.createElement');
    return className
      ? document.createElement(tag).classList.add(className)
      : document.createElement(tag);
  }

  getElement(selector) {
    console.log('view.getElement');
    return document.querySelector(selector);
  }

  bindOnClickToggleButton(handler) {
    console.log('view.bindOnClickToggleButton');
    this.$toggleButton.addEventListener('click', event => {
      console.log()
      handler(10);
    });
  }

  bindOnClickPurchaseButton(handler) {
    console.log('view.bindOnClickPurchaseButton');
    this.$purchaseButton.addEventListener('click', event => {
      handler();
    });
  }
}