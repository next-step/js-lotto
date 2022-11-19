import Result from "./Result.js";
import { NOT_IN_THOUSANDS } from "../constants/message.js";

const TICKET_PRICE = 1000;

class Lotto {
  constructor() {
    this.purchaseAmount = 0;

    this.$purchaseForm = document.querySelector("#purchase-form");
    this.$purchaseAmountInput = document.querySelector(
      "#purchase-amount-input"
    );

    this.Result = new Result();
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

    this.Result.setEvent();
  }

  purchaseLotto() {
    const purchaseCount = this.purchaseAmount / TICKET_PRICE;
    this.Result.renderResult(purchaseCount);
  }
}

export default Lotto;
