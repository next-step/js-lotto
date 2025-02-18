import Lotto from "../../../domain/Lotto/index.js";

const titleTemplate = document.createElement("template");
titleTemplate.innerHTML = `
<style>
    #number-box {
        display: flex;
        justify-content: space-between;
    }
</style>
<div id="number-box">
    <div>
        <input class="winning-number" size=1 maxlength=2 min=1 max=45 />
        <input class="winning-number" size=1 maxlength=2 min=1 max=45/>
        <input class="winning-number" size=1 maxlength=2 min=1 max=45/>
        <input class="winning-number" size=1 maxlength=2 min=1 max=45/>
        <input class="winning-number" size=1 maxlength=2 min=1 max=45/>
        <input class="winning-number" size=1 maxlength=2 min=1 max=45/>
    </div>
    <div>
         <input class="bonus-number" size=1 maxlength=2 min=1 max=45 />
    </div>
</div>
`;

class NumberBox extends HTMLElement {
  // 반드시 있어야 함
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(titleTemplate.content.cloneNode(true));

    const winningNumbers = this.shadowRoot.querySelectorAll(".winning-number");

    const bonusNumbers = this.shadowRoot.querySelectorAll(".bonus-number");

    this.shadowRoot.addEventListener("submit-restart-event", () => {
      winningNumbers.forEach((target) => {
        // eslint-disable-next-line no-param-reassign
        target.value = "";
      });
      bonusNumbers.forEach((target) => {
        // eslint-disable-next-line no-param-reassign
        target.value = "";
      });
    });

    this.shadowRoot.addEventListener("submit-input-event", () => {
      const newWinningNumbers = Array.from(winningNumbers).map(
        (winningNumber) => winningNumber.value,
      );
      const newBonusNumber = Array.from(bonusNumbers)
        .map((bonusNumber) => bonusNumber.value)
        .at(0);

      const lotto = new Lotto({
        winningNumber: newWinningNumbers.map((val) => parseInt(val, 10)),
        bonusNumber: parseInt(newBonusNumber, 10),
      });

      console.log(lotto);

      const LottoEvent = new CustomEvent("submit-output-event", {
        detail: {
          lotto,
        },
        composed: true,
      });

      const winningDetailElement = document.querySelector("winning-detail");
      winningDetailElement.shadowRoot.dispatchEvent(LottoEvent);
    });

    // const ratesOfReturnElement = document.querySelector("rates-of-return");
    // ratesOfReturnElement.shadowRoot.dispatchEvent(submitEvent);

    // console.log(winningNumbers, bonusNumbers);
  }
}
customElements.define("number-box", NumberBox);
