import RatesOfReturn from "../../../domain/RatesOfReturn/index.js";

const titleTemplate = document.createElement("template");
titleTemplate.innerHTML = `
<style>

    ::slotted(h1) {
        color: black;
        font-size: 20px;
        font-weight: bold;
        background-color: #666;
    }
</style>
<div id="rates-of-return"></div>
`;

class RatesOfReturnComponent extends HTMLElement {
  // 반드시 있어야 함
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = {
      purchasePrice: null,
      winningDetail: null,
    };
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(titleTemplate.content.cloneNode(true));

    this.shadowRoot.addEventListener(
      "submit-output-rates-of-return-event",
      (e) => {
        console.log(e.detail);
        this.state = { ...this.state, ...e.detail };
        if (
          this.state.purchasePrice !== null &&
          this.state.winningDetail !== null
        ) {
          const newRatesOfReturn = new RatesOfReturn({
            ...this.state,
          });
          console.log(this.state, newRatesOfReturn);

          const ratesOfReturnElement =
            this.shadowRoot.querySelector("#rates-of-return");
          ratesOfReturnElement.textContent = `당신의 총 수익률은 ${newRatesOfReturn.getValue}입니다`;
        }
      },
    );
  }
}
customElements.define("rates-of-return", RatesOfReturnComponent);
