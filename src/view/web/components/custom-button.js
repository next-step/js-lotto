const titleTemplate = document.createElement("template");
titleTemplate.innerHTML = `
<style>
    ::slotted(button) {
      width: 100px;
    }
    ::slotted(#submit)
</style>
<slot name="custom-button"></slot>
`;

class CustomButton extends HTMLElement {
  // 반드시 있어야 함
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(titleTemplate.content.cloneNode(true));

    const slot = this.shadowRoot.querySelector("slot");
    const assignedNodes = slot.assignedNodes();

    const submitButton = assignedNodes.find(
      (node) => node.id === "submit-button",
    );
    const restartButton = assignedNodes.find(
      (node) => node.id === "restart-button",
    );

    if (submitButton) {
      submitButton.addEventListener("click", this.handleSubmitClick.bind(this));
    }
    if (restartButton) {
      restartButton.addEventListener("click", this.handleResetClick.bind(this));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmitClick() {
    const submitEvent = new CustomEvent("submit-input-event", {
      composed: true,
    });

    // const winningDetailElement = document.querySelector("winning-detail");
    // const ratesOfReturnElement = document.querySelector("rates-of-return");
    // winningDetailElement.shadowRoot.dispatchEvent(submitEvent);
    // ratesOfReturnElement.shadowRoot.dispatchEvent(submitEvent);
    // console.log(winningDetailElement);
    const numberBoxElement = document.querySelector("number-box");
    const purchaseHistoryElement = document.querySelector("purchase-history");
    const moneyInputElement = document.querySelector("money-input");
    numberBoxElement.shadowRoot.dispatchEvent(submitEvent);
    purchaseHistoryElement.shadowRoot.dispatchEvent(submitEvent);
    moneyInputElement.shadowRoot.dispatchEvent(submitEvent);
  }

  // eslint-disable-next-line class-methods-use-this
  handleResetClick() {
    const restartEvent = new CustomEvent("submit-restart-event", {
      composed: true,
    });
    const numberBoxElement = document.querySelector("number-box");
    const purchaseHistoryElement = document.querySelector("purchase-history");
    const moneyInputElement = document.querySelector("money-input");
    const winningDetailElement = document.querySelector("winning-detail");
    numberBoxElement.shadowRoot.dispatchEvent(restartEvent);
    purchaseHistoryElement.shadowRoot.dispatchEvent(restartEvent);
    moneyInputElement.shadowRoot.dispatchEvent(restartEvent);
    winningDetailElement.shadowRoot.dispatchEvent(restartEvent);
  }
}
customElements.define("custom-button", CustomButton);
