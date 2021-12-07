import { $, ascendingSort } from "../utils/common.js";
import View from "./View.js";

class PurchasedLottoView extends View {
  tag = "PurchasedLottoView";
  $purchasedResultMessage;
  $lottoList;

  constructor() {
    super();
    this.$purchasedResultMessage = $(".purchased-lotto-message");
    this.$lottoList = $(".purchased-lotto-list");
  }

  bindEvent() {
    $(".lotto-numbers-toggle-button")
      .addEventListener("change", this.toggleBtnChangeHandler);
  }

  toggleBtnChangeHandler = e => {
    this.$lottoList
      .classList[e.currentTarget.checked ? "remove" : "add"]("hide-details");
  }

  render({ amount, lottoTickets }) {
    this.$purchasedResultMessage.textContent = `총 ${amount}개를 구매하였습니다.`;
    this.$lottoList.innerHTML = this.getListHTML(lottoTickets);

    return this;
  }

  getListHTML(lottoTickets) {
    return `<ul class="d-flex flex-wrap">
      ${lottoTickets.map((numbers) => 
        `<li class="mx-1 text-4xl lotto-wrapper">
          <span class="lotto-icon">🎟️ </span>
          <span class="lotto-detail">${ascendingSort(numbers).join(", ")}</span>
        </li>`
      ).join("")}
    </ul>`;
  }
}

export default new PurchasedLottoView();
