import BaseElement from "../common/base-element.js";
import html from "../common/html.js";

class GameText extends BaseElement {
  connectedCallback() {
    this.shadowRoot.innerHTML = this.createTemplate();
  }

  // eslint-disable-next-line class-methods-use-this
  createTemplate() {
    return html`
      <style>
        ::slotted(h1) {
          display: flex;
          align-items: center;
          justify-content: center;
          color: black;
          font-size: 30px;
          font-weight: bold;
        }

        ::slotted(#winning) {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      </style>
      <slot name="game-text"></slot>
    `;
  }
}
customElements.define("game-text", GameText);
