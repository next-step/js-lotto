import BaseElement from "../common/base-element.js";
import html from "../common/html.js";

class AppRoot extends BaseElement {
  connectedCallback() {
    this.shadowRoot.innerHTML = this.createTemplate();

    const slot = this.shadowRoot.querySelector("slot");

    slot.addEventListener("slotchange", this.slotChanged.bind(this));

    window.onerror = function (message, source, lineno, colno, error) {
      console.error(error);
      alert(error);
    };
  }

  slotChanged() {
    const slot = this.shadowRoot.querySelector("slot");
    const assignedNodes = slot.assignedNodes();
    const targetElement = assignedNodes.find(
      (node) => node.nodeName === "PURCHASE-HISTORY",
    );
    this.shadowRoot.addEventListener("money-changed", (e) => {
      const { money } = e.detail;
      const event = new CustomEvent("money-changed", {
        detail: {
          money,
        },
        composed: true,
      });
      targetElement.shadowRoot.dispatchEvent(event);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createTemplate() {
    return html`
      <style>
        section {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      </style>
      <section>
        <slot></slot>
        <section></section>
      </section>
    `;
  }
}
customElements.define("app-root", AppRoot);
