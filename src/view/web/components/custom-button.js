import BaseElement from "../common/base-element.js";
import {
  eventEmit,
  resetEventReceivedComponents,
  RESTART_EVENT,
  SUBMIT_EVENT,
  submitEventReceivedComponents,
} from "../common/event-emit.js";
import html from "../common/html.js";

class CustomButton extends BaseElement {
  connectedCallback() {
    this.shadowRoot.innerHTML = this.createTemplate();

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
    eventEmit(SUBMIT_EVENT, submitEventReceivedComponents);
  }

  // eslint-disable-next-line class-methods-use-this
  handleResetClick() {
    eventEmit(RESTART_EVENT, resetEventReceivedComponents);
  }

  // eslint-disable-next-line class-methods-use-this
  createTemplate() {
    return html`
      <style>
        ::slotted(button) {
          width: 100px;
        }
        ::slotted(#submit);
      </style>
      <slot name="custom-button"></slot>
    `;
  }
}
customElements.define("custom-button", CustomButton);
