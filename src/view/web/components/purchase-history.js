import { getRandomArrayWithTicketLength } from "../../../domain/Lotto/random.js";
import PurchaseHistory from "../../../domain/PurchaseHistory/index.js";
import Ticket from "../../../domain/Ticket/index.js";
import { getTicketAvailable } from "../../../domain/Ticket/rule.js";
import { printTicketLength } from "../printResult.js";

const purchaseHistoryTemplate = document.createElement("template");
purchaseHistoryTemplate.innerHTML = `
<style>
    #purchase-history {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
</style>
<div>
    <div id="ticket-length"></div>
    <div id="purchase-history"></div>
</div>
`;

class PurchaseHistoryUI extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = { purchaseHistory: [] };
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(purchaseHistoryTemplate.content.cloneNode(true));
    // const span = this.shadowRoot.querySelector("span#input-label");
    this.shadowRoot.addEventListener("money-changed", (e) => {
      const { money } = e.detail;

      const ticketLength = getTicketAvailable(money);

      const ticketLengthElement =
        this.shadowRoot.querySelector("#ticket-length");

      ticketLengthElement.textContent = printTicketLength(ticketLength);

      const tickets = Array.from({ length: ticketLength }).map(() => {
        const randomNumbers = getRandomArrayWithTicketLength();

        const sortedRandomNumbers = randomNumbers.sort((a, b) => a - b);
        console.log(sortedRandomNumbers);

        const ticket = new Ticket({
          numbers: sortedRandomNumbers,
        });

        return ticket;
      });

      const purchaseHistory = new PurchaseHistory({
        tickets,
      });

      this.state.purchaseHistory = purchaseHistory;
      this.render();
    });

    this.shadowRoot.addEventListener("submit-input-event", () => {
      // console.log(e.detail, this.state.purchaseHistory);
      const purchaseHistoryEvent = new CustomEvent("submit-output-event", {
        detail: {
          purchaseHistory: this.state.purchaseHistory,
        },
        composed: true,
      });

      const winningDetailElement = document.querySelector("winning-detail");
      winningDetailElement.shadowRoot.dispatchEvent(purchaseHistoryEvent);
    });
  }

  render() {
    const showCountData = this.shadowRoot.querySelector(
      "div[id='purchase-history']",
    );

    showCountData.innerHTML = `${this.state.purchaseHistory.getTickets.reduce(
      (acr, cur) => {
        // eslint-disable-next-line no-param-reassign
        acr += cur ? `<div>${cur.getNumbers}</div>` : "";
        // acr += cur.getNumbers;
        return acr;
      },
      "",
    )}`;
  }
}
customElements.define("purchase-history", PurchaseHistoryUI);
