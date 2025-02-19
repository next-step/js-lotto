import BaseElement from "../common/base-element.js";
import html from "../common/html.js";

class MoneyInput extends BaseElement {
  connectedCallback() {
    this.state = {
      money: "",
    };
    this.shadowRoot.innerHTML = this.createTemplate();

    const button = this.shadowRoot.querySelector("#money-button");
    button.addEventListener("click", this.handleClick.bind(this));

    this.shadowRoot.addEventListener("restart-event", () => {
      const slot = this.shadowRoot.querySelector("slot[name='input-box']");
      const assignedNodes = slot.assignedNodes();

      const inputBox = assignedNodes.find((node) => node.nodeName === "INPUT");

      inputBox.value = "";

      this.state = {
        money: "",
      };
      const purchaseHistoryElement = document.querySelector("purchase-history");

      const event = new CustomEvent("money-changed", {
        detail: {
          money: this.state.money,
        },
        bubbles: true,
        composed: true,
      });

      purchaseHistoryElement.shadowRoot.dispatchEvent(event);

      const ratesOfReturnElement = document.querySelector("rates-of-return");

      const winningDetailEvent = new CustomEvent(
        "submit-output-rates-of-return-event",
        {
          detail: {
            purchasePrice: this.state.money,
          },
          composed: true,
        },
      );

      ratesOfReturnElement.shadowRoot.dispatchEvent(winningDetailEvent);
    });
  }

  handleClick() {
    const slot = this.shadowRoot.querySelector("slot[name='input-box']");
    const assignedNodes = slot.assignedNodes();

    const inputBox = assignedNodes.find((node) => node.nodeName === "INPUT");

    this.state.money = inputBox.value;

    console.log("OK!", this.state.money);

    const purchaseHistoryElement = document.querySelector("purchase-history");

    const event = new CustomEvent("money-changed", {
      detail: {
        money: this.state.money,
      },
      bubbles: true,
      composed: true,
    });

    purchaseHistoryElement.shadowRoot.dispatchEvent(event);

    const ratesOfReturnElement = document.querySelector("rates-of-return");

    const winningDetailEvent = new CustomEvent(
      "submit-output-rates-of-return-event",
      {
        detail: {
          purchasePrice: this.state.money,
        },
        composed: true,
      },
    );

    ratesOfReturnElement.shadowRoot.dispatchEvent(winningDetailEvent);
  }

  // eslint-disable-next-line class-methods-use-this
  createTemplate() {
    return html`
      <style>
        #money-input {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        div .box {
          display: flex;
          gap: 3px;
        }
      </style>
      <div id="money-input">
        <slot name="input-label"></slot>
        <div class="box">
          <slot id="money-input-box" name="input-box"></slot>
          <slot id="money-button" name="input-button"></slot>
        </div>
      </div>
    `;
  }
}
customElements.define("money-input", MoneyInput);
