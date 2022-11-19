import PurchaseResult from "./PurchaseResult.js";
import { NOT_IN_THOUSANDS } from "../constants/message.js";

const TICKET_PRICE = 1000;

class Lotto {
  constructor() {
    this.purchaseAmount = 0;

    this.$purchaseForm = document.querySelector("#purchase-form");
    this.$purchaseAmountInput = document.querySelector(
      "#purchase-amount-input"
    );

    this.PurchaseResult = new PurchaseResult();
  }

  setEvent() {
    this.$purchaseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.purchaseAmount % TICKET_PRICE !== 0) {
        alert(NOT_IN_THOUSANDS);
      } else {
        this.purchaseLotto();
      }
    });
    this.$purchaseAmountInput.addEventListener("change", (event) => {
      this.purchaseAmount = event.target.value;
    });

    this.PurchaseResult.setEvent();
  }

  purchaseLotto() {
    const purchaseCount = this.purchaseAmount / TICKET_PRICE;
    this.PurchaseResult.render(purchaseCount);
  }
}

export default Lotto;
