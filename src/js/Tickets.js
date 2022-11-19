import { getNumberFilledArray, shuffleArray } from "./utils.js";

class Tickets {
  constructor() {
    this.$purchaseResult = document.querySelector("#purchase-result");
    this.$purchaseCount = document.querySelector("#purchase-count");
    this.$showNumbersToggle = document.querySelector("#show-numbers-toggle");
    this.$purchasedTicketContainer =
      document.querySelector("#ticket-container");
  }

  setEvent() {
    this.$showNumbersToggle.addEventListener("change", (event) => {
      this.toggleShowNumbers(event.target.checked);
    });
  }

  renderTicketContainer(purchaseCount) {
    this.$purchaseCount.innerHTML = purchaseCount;
    this.$purchasedTicketContainer.innerHTML = "";
  }

  getRandomLottoNumbers() {
    return shuffleArray(getNumberFilledArray(45)).slice(0, 6).join(", ");
  }

  renderTicket() {
    const randomLottoNumbers = this.getRandomLottoNumbers();

    this.$purchaseResult.style.display = "block";
    this.$purchasedTicketContainer.insertAdjacentHTML(
      "beforeend",
      `<span class="mx-1 text-4xl d-flex items-center" data-cy="lotto-ticket">
        <span class="ticket-icon">🎟️</span>
        <span class="ticket-detail text-base ml-2 d-none" id="ticket-detail">
          ${randomLottoNumbers}
        </span>
      </span>`
    );
  }

  toggleShowNumbers(checked) {
    if (checked) {
      this.$purchasedTicketContainer.classList.add("flex-col", "d-block");
    } else {
      this.$purchasedTicketContainer.classList.remove("flex-col", "d-block");
    }
  }
}

export default Tickets;
