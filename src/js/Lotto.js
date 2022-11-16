import { getRandomLottoNumbers } from "./utils.js";

class Lotto {
  constructor() {
    this.purchaseAmount = 0;

    this.$purchaseResult = document.querySelector("#purchase-result");
    this.$purchaseCount = document.querySelector("#purchase-count");
    this.$purchaseForm = document.querySelector("#purchase-form");
    this.$purchaseAmountInput = document.querySelector(
      "#purchase-amount-input"
    );
    this.$purchasedTicketContainer =
      document.querySelector("#ticket-container");
    this.$showNumbersToggle = document.querySelector("#show-numbers-toggle");
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
    this.$showNumbersToggle.addEventListener("change", (event) => {
      this.toggleShowNumbers(event.target.checked);
    });
  }

  purchaseLotto() {
    const purchaseCount = this.purchaseAmount / 1000;

    this.renderTicketContainer(purchaseCount);
    for (let i = 0; i < purchaseCount; i++) {
      this.renderTickets();
    }
  }

  renderTicketContainer(purchaseCount) {
    this.$purchaseCount.innerHTML = purchaseCount;
    this.$purchasedTicketContainer.innerHTML = "";
  }

  renderTickets() {
    const randomLottoNumbers = getRandomLottoNumbers();

    this.$purchaseResult.style.display = "block";
    this.$purchasedTicketContainer.insertAdjacentHTML(
      "beforeend",
      `<span class="mx-1 text-4xl d-flex items-center" data-cy="lotto-ticket">
        <span class="ticket-icon">🎟️</span>
        <span class="ticket-detail text-base ml-2" id="ticket-detail" style="display: none">
          ${randomLottoNumbers}
        </span>
      </span>`
    );
  }

  toggleShowNumbers(checked) {
    const $ticketDetailList = document.querySelectorAll("#ticket-detail");

    if (checked) this.$purchasedTicketContainer.classList.add("flex-col");
    else this.$purchasedTicketContainer.classList.remove("flex-col");

    for (let i = 0; i < $ticketDetailList.length; i++) {
      $ticketDetailList[i].style.display = checked ? "block" : "none";
    }
  }
}

export default Lotto;
