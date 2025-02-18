const titleTemplate = document.createElement("template");
titleTemplate.innerHTML = `
<style>

    ::slotted(h1) {
        color: black;
        font-size: 20px;
        font-weight: bold;
        background-color: #666;
    }

    ::slotted(#winning) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
<slot name="game-text"></slot>
`;

class GameText extends HTMLElement {
  // 반드시 있어야 함
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(titleTemplate.content.cloneNode(true));
  }
}
customElements.define("game-text", GameText);
