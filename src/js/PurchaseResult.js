import PurchaseCount from "./PurchaseCount.js";
import ShowNumbersToggle from "./ShowNumbersToggle.js";
import Tickets from "./Tickets.js";

class PurchaseResult {
  constructor() {
    this.$purchaseResult = document.querySelector("#purchase-result");
    this.$ticketContainer = document.querySelector("#ticket-container");

    this.PurchaseCount = new PurchaseCount();
    this.ShowNumbersToggle = new ShowNumbersToggle();
    this.Tickets = new Tickets();
  }

  setEvent() {
    this.ShowNumbersToggle.setEvent();
  }

  render(purchaseCount) {
    this.$purchaseResult.classList.remove("d-none");
    this.$ticketContainer.innerHTML = "";
    this.PurchaseCount.render({ purchaseCount });
    this.Tickets.render({ purchaseCount });
  }
}

export default PurchaseResult;
