import WinningDetail from "../../../domain/WinningDetail/index.js";

const titleTemplate = document.createElement("template");
titleTemplate.innerHTML = `
<style>
  .label {
    margin: 10px 0;

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
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<div>
  <h3 class="label">
    당첨 통계
  </h3>
  <div id="winning-detail">
  </div>
</div>
`;

class WinningDetailComponent extends HTMLElement {
  // 반드시 있어야 함
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = {
      purchaseHistory: null,
      lotto: null,
    };
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(titleTemplate.content.cloneNode(true));

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
      ${datas.map((data) => `<div class="box">${data.map((line) => `<div class="box-element">${line}</div>`).join("")}</div>`)}
    `;

    this.shadowRoot.addEventListener("submit-restart-event", () => {
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

        winningDetailElement.innerHTML = `
      ${datas.map(
        (data, rowIndex) =>
          `<div class="box">${data
            .map(
              (line, index) =>
                `<div class="box-element">${rowIndex >= 1 && index === data.length - 1 ? newWinningDetail.getWinner[6 - rowIndex] : line}</div>`,
            )
            .join("")}</div>`,
      )}
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
}
customElements.define("winning-detail", WinningDetailComponent);
