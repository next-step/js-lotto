import Tickets from "./Tickets.js";

class Lotto {
  constructor() {
    this.purchaseAmount = 0;

    this.$purchaseForm = document.querySelector("#purchase-form");
    this.$purchaseAmountInput = document.querySelector(
      "#purchase-amount-input"
    );

    this.Tickets = new Tickets();
  }

  setEvent() {
    this.$purchaseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.purchaseAmount % 1000 !== 0) {
        alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
      } else {
        this.purchaseLotto();
      }
    });
    this.$purchaseAmountInput.addEventListener("change", (event) => {
      this.purchaseAmount = event.target.value;
    });

    this.Tickets.setEvent();
  }

  purchaseLotto() {
    const purchaseCount = this.purchaseAmount / 1000;

    this.Tickets.renderTicketContainer(purchaseCount);
    for (let i = 0; i < purchaseCount; i++) {
      this.Tickets.renderTicket();
    }
  }
}

export default Lotto;
