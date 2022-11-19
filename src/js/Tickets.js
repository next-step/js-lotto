import { getNumberFilledArray, shuffleArray } from "./utils.js";

class Tickets {
  constructor() {
    this.$ticketContainer = document.querySelector("#ticket-container");
  }

  getRandomLottoNumbers() {
    return shuffleArray(getNumberFilledArray(45)).slice(0, 6).join(", ");
  }

  render({ purchaseCount }) {
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
}

export default Tickets;
