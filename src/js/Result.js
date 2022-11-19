import { getNumberFilledArray, shuffleArray } from "./utils.js";

class Result {
  constructor() {
    this.$purchaseResult = document.querySelector("#purchase-result");
    this.$purchaseCount = document.querySelector("#purchase-count");
    this.$showNumbersToggle = document.querySelector("#show-numbers-toggle");
    this.$ticketContainer = document.querySelector("#ticket-container");
  }

  setEvent() {
    this.$showNumbersToggle.addEventListener("change", (event) => {
      this.toggleShowNumbers(event.target.checked);
    });
  }

  toggleShowNumbers(checked) {
    if (checked) this.$ticketContainer.classList.add("flex-col", "d-block");
    else this.$ticketContainer.classList.remove("flex-col", "d-block");
  }

  getRandomLottoNumbers() {
    return shuffleArray(getNumberFilledArray(45)).slice(0, 6).join(", ");
  }

  renderPurchaseCount(purchaseCount) {
    this.$purchaseCount.innerHTML = purchaseCount;
  }

  renderTickets(purchaseCount) {
    const ticketTemplates = Array(purchaseCount)
      .fill()
      .reduce((acc) => {
        const randomLottoNumbers = this.getRandomLottoNumbers();
        const ticketTemplate = `
          <span class="mx-1 text-4xl d-flex items-center" data-cy="lotto-ticket">
            <span class="ticket-icon">🎟️</span>
            <span class="ticket-detail text-base ml-2 d-none" id="ticket-detail">
              ${randomLottoNumbers}
            </span>
          </span>`;
        acc += ticketTemplate;
        return acc;
      }, "");

    this.$ticketContainer.insertAdjacentHTML("beforeend", ticketTemplates);
  }

  renderResult(purchaseCount) {
    this.$purchaseResult.classList.remove("d-none");
    this.$ticketContainer.innerHTML = "";
    this.renderPurchaseCount(purchaseCount);
    this.renderTickets(purchaseCount);
  }
}

export default Result;
