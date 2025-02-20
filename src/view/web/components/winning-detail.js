import WinningDetail from "../../../domain/WinningDetail/index.js";
import BaseElement from "../common/base-element.js";
import html from "../common/html.js";

class WinningDetailComponent extends BaseElement {
  connectedCallback() {
    this.state = {
      purchaseHistory: null,
      lotto: null,
    };

    this.shadowRoot.innerHTML = this.createTemplate();

    const datas = [
      ["일치 개수", "당첨금", "당첨 갯수"],
      ["3개", "5,000", 0],
      ["4개", "50,000", 0],
      ["5개", "1,500,000", 0],
      ["5개+보너스볼", "30,000,000", 0],
      ["6개", "2,000,000,000", 0],
    ];

    const winningDetailElement =
      this.shadowRoot.querySelector("#winning-detail");

    winningDetailElement.innerHTML = `
      ${datas.map((data) => `<div class="box">${data.map((line) => `<div class="box-element">${line}</div>`).join("")}</div>`).join("<br />")}
    `;

    this.shadowRoot.addEventListener("restart-event", () => {
      this.state = {
        purchaseHistory: null,
        lotto: null,
      };
    });

    this.shadowRoot.addEventListener("submit-output-event", (e) => {
      this.state = { ...this.state, ...e.detail };
      console.log(this.state);
      if (this.state.purchaseHistory !== null && this.state.lotto !== null) {
        const newWinningDetail = new WinningDetail({
          ...this.state,
        });
        console.log(this.state, newWinningDetail);

        const lineHtml = (line, index, data, rowIndex) =>
          `<div class="box-element">${rowIndex >= 1 && index === data.length - 1 ? newWinningDetail.getWinner[6 - rowIndex] : line}</div>`;

        winningDetailElement.innerHTML = `
      ${datas
        .map(
          (data, rowIndex) =>
            `<div class="box">${data
              .map((line, index) => lineHtml(line, index, data, rowIndex))
              .join("")}</div>`,
        )
        .join("<br />")}
    `;

        const ratesOfReturnElement = document.querySelector("rates-of-return");

        const winningDetailEvent = new CustomEvent(
          "submit-output-rates-of-return-event",
          {
            detail: {
              winningDetail: newWinningDetail,
            },
            composed: true,
          },
        );

        ratesOfReturnElement.shadowRoot.dispatchEvent(winningDetailEvent);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createTemplate() {
    return html`
      <style>
        .label {
          margin: 20px 0;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .box {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .box-element {
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          border-radius: 10px;
        }
        .box-element:nth-child(1) {
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          background: lightblue;
        }
        .box-element:nth-child(3) {
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          background: yellow;
        }
      </style>
      <div>
        <h3 class="label">당첨 통계</h3>
        <div id="winning-detail"></div>
      </div>
    `;
  }
}
customElements.define("winning-detail", WinningDetailComponent);
