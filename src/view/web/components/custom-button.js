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
          background-color: rgba(51, 51, 51, 0.05);
          border-radius: 8px;
          border-width: 0;
          color: #333333;
          cursor: pointer;
          display: inline-block;
          font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica,
            Arial, sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          list-style: none;
          margin: 0;
          padding: 10px 12px;
          text-align: center;
          transition: all 200ms;
          vertical-align: baseline;
          white-space: nowrap;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
        }
        ::slotted(#submit);
      </style>
      <slot name="custom-button"></slot>
    `;
  }
}
customElements.define("custom-button", CustomButton);
