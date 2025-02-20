import Lotto from "../../../domain/Lotto/index.js";
import BaseElement from "../common/base-element.js";
import html from "../common/html.js";

class NumberBox extends BaseElement {
  connectedCallback() {
    this.shadowRoot.innerHTML = this.createTemplate();

    const winningNumbers = this.shadowRoot.querySelectorAll(".winning-number");

    const bonusNumbers = this.shadowRoot.querySelectorAll(".bonus-number");

    this.shadowRoot.addEventListener("restart-event", () => {
      winningNumbers.forEach((target) => {
        // eslint-disable-next-line no-param-reassign
        target.value = "";
      });
      bonusNumbers.forEach((target) => {
        // eslint-disable-next-line no-param-reassign
        target.value = "";
      });
    });

    this.shadowRoot.addEventListener("submit-event", () => {
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
  }

  // eslint-disable-next-line class-methods-use-this
  createTemplate() {
    return html`
      <style>
        #number-box {
          display: flex;
          justify-content: space-between;
        }
        input {
          border: 3px solid blue;
          padding: 2px 10px;
          text-align: center;
          font-weight: bold;
        }

        input:placeholder-shown {
          border: 3px solid red;
        }
      </style>
      <div id="number-box">
        <div>
          <input
            class="winning-number"
            size="10"
            placeholder="첫 번째 숫자"
            maxlength="2"
            min="1"
            max="45"
          />
          <input
            class="winning-number"
            size="10"
            placeholder="두 번째 숫자"
            maxlength="2"
            min="1"
            max="45"
          />
          <input
            class="winning-number"
            size="10"
            placeholder="세 번째 숫자"
            maxlength="2"
            min="1"
            max="45"
          />
          <input
            class="winning-number"
            size="10"
            placeholder="네 번째 숫자"
            maxlength="2"
            min="1"
            max="45"
          />
          <input
            class="winning-number"
            size="10"
            placeholder="다섯 번째 숫자"
            maxlength="2"
            min="1"
            max="45"
          />
          <input
            class="winning-number"
            size="10"
            placeholder="여섯 번째 숫자"
            maxlength="2"
            min="1"
            max="45"
          />
        </div>
        <div>
          <input
            class="bonus-number"
            size="10"
            placeholder="보너스 숫자"
            maxlength="2"
            min="1"
            max="45"
          />
        </div>
      </div>
    `;
  }
}
customElements.define("number-box", NumberBox);
