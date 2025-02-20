import RatesOfReturn from "../../../domain/RatesOfReturn/index.js";
import BaseElement from "../common/base-element.js";
import html from "../common/html.js";

class RatesOfReturnComponent extends BaseElement {
  connectedCallback() {
    this.state = {
      purchasePrice: null,
      winningDetail: null,
    };

    this.shadowRoot.innerHTML = this.createTemplate();

    this.shadowRoot.addEventListener(
      "submit-output-rates-of-return-event",
      (e) => {
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

  // eslint-disable-next-line class-methods-use-this
  createTemplate() {
    return html`
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
  }
}
customElements.define("rates-of-return", RatesOfReturnComponent);
