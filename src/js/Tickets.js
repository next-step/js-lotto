import { getRandomLottoNumbers } from "./utils.js";

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

export default Tickets;
