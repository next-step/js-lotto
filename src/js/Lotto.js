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
        <span class="lotto-icon">🎟️</span>
        <span class="lotto-detail text-base ml-2" id="lotto-detail" style="display: none">
          ${randomLottoNumbers}
        </span>
      </span>`
    );
  }
}

export default Lotto;
