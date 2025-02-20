import { getRandomArrayWithTicketLength } from "../../../domain/Lotto/random.js";
import PurchaseHistory from "../../../domain/PurchaseHistory/index.js";
import Ticket from "../../../domain/Ticket/index.js";
import { getTicketAvailable } from "../../../domain/Ticket/rule.js";
import { printTicketLength } from "../printResult.js";
import BaseElement from "../common/base-element.js";
import html from "../common/html.js";
import createRandomColor from "../common/create-random-color.js";

class PurchaseHistoryUI extends BaseElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = { purchaseHistory: [] };
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.createTemplate();
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

    this.shadowRoot.addEventListener("submit-event", () => {
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
      (acr, cur, index) => {
        // eslint-disable-next-line no-param-reassign
        acr += cur
          ? `
          <div> 
            <div><strong>${index + 1}</strong> 번째 번호입니다!</div>

            <div class="numberBox">
              ${cur.getNumbers
                .map((number) => {
                  const randomColor = createRandomColor();
                  return `<div class="value"
                  style="background:${randomColor};"
                >${number}</div>`;
                })
                .join("")}
            </div>  
          </div>`
          : "";
        return acr;
      },
      "",
    )}`;
  }

  // eslint-disable-next-line class-methods-use-this
  createTemplate() {
    return html`
      <style>
        #purchase-history {
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin: 15px;
        }
        .numberBox {
          display: flex;
          flex-direction: row;
          gap: 10px;
          font-size: 20px;
        }
        .numberBox .value {
          padding: 20px 20px;
          background: red;
          border-radius: 100%;
        }
      </style>
      <div>
        <div id="ticket-length"></div>
        <div id="purchase-history"></div>
      </div>
    `;
  }
}
customElements.define("purchase-history", PurchaseHistoryUI);
