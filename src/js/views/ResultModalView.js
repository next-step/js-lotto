import { $, numberWithCommas, toFixedDecimalPoint } from "../utils/common.js";
import { WINNINGS } from "../constants/index.js"
import View from "./View.js";

class ResultModalView extends View {
  tag = "ResultModalView";
  openClassName = "open"
  $totalWinningResult;
  $resultTable;

  constructor() {
    super();
    this.$modalClose = $(".modal-close", this.$elem);
    this.$resultTable = $("#LottoResultTable", this.$elem);
    this.$totalWinningResult = $(".total-winning-result", this.$elem);
    this.$btnRestart = $(".btn-restart", this.$elem);
  }

  bindEvent() {
    this.$modalClose.addEventListener("click", this.hide);
    this.$btnRestart.addEventListener("click", this.restartHandler);
  }

  restartHandler = () => {
    this.emit("restart");
  }

  render({ lottoResultObj, totalReturnRate }) {
    this.$resultTable.innerHTML = this.getListHTML(lottoResultObj);
    this.$totalWinningResult.textContent = `당신의 총 수익률은 ${toFixedDecimalPoint(totalReturnRate, 2)}%입니다.`;

    return this;
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
