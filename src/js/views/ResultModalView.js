import { selector, numberWithCommas } from "../utils/common.js";
import { WINNINGS } from "../constants/index.js"
import View from "./View.js";

class ResultModalView extends View {
  tag = "ResultModalView";
  openClassName = "open"
  $totalWinningResult;
  $resultTable;

  constructor() {
    super();
    this.$modalClose = selector(".modal-close", this.$elem);
    this.$resultTable = selector("#LottoResultTable", this.$elem);
    this.$totalWinningResult = selector(".total-winning-result", this.$elem);
    this.$btnRestart = selector(".btn-restart", this.$elem);
  }

  bindEvent() {
    console.log("this.$modalClose >>",this.$modalClose);
    this.$modalClose.addEventListener("click", this.hide);
    this.$btnRestart.addEventListener("click", this.restartHandler);
  }

  restartHandler = () => {
    this.emit("restart");
  }

  render({ lottoResultObj, totlaReturnRate }) {
    this.$resultTable.innerHTML = this.getListHTML(lottoResultObj);
    this.$totalWinningResult.textContent = `당신의 총 수익률은 ${totlaReturnRate}%입니다.`;
  }

  getListHTML(lottoResultObj) {
    return `<tbody>
    ${Object.entries(WINNINGS).map(([key, { text, price }]) => 
      `<tr class="text-center">
        <td class="p-3">${ text }</td>
        <td class="p-3">${ numberWithCommas(price) }</td>
        <td class="p-3 winning-result-num3">${ lottoResultObj[key] }</td>
      </tr>`
    ).join("")}
    </tbody>`
  }

  show = () => {
    this.$elem.classList.add(this.openClassName);
    return this;
  }

  hide = () => {
    this.$elem.classList.remove(this.openClassName);
    return this;
  }
}

export default new ResultModalView();
