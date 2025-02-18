const appRootTemplate = document.createElement("template");
appRootTemplate.innerHTML = `
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
    <section>
`;

class AppRoot extends HTMLElement {
  // 반드시 있어야 함
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(appRootTemplate.content.cloneNode(true));

    const slot = this.shadowRoot.querySelector("slot");
    slot.addEventListener("slotchange", this.slotChanged.bind(this));
  }

  slotChanged() {
    const slot = this.shadowRoot.querySelector("slot");
    const assignedNodes = slot.assignedNodes();
    const targetElement = assignedNodes.find(
      (node) => node.nodeName === "PURCHASE-HISTORY",
    );
    this.shadowRoot.addEventListener(
      "money-changed",
      (e) => {
        const { money } = e.detail;
        const event = new CustomEvent("money-changed", {
          detail: {
            money,
          },
          composed: true,
        });
        targetElement.shadowRoot.dispatchEvent(event);
      },
      // { once: true },
    );
  }
}
customElements.define("app-root", AppRoot);
