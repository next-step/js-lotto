class BaseElement extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.createTemplate().content.cloneNode(true));
  }

  // eslint-disable-next-line class-methods-use-this
  createTemplate() {
    throw new Error("createTemplate() method must be implemented");
  }
}

export default BaseElement;
