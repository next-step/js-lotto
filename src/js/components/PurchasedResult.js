import Component from "../core/Component.js";
import { EVENT } from "../utils/const.js";
import { Store, setState } from "../store/index.js";

export default class PurchasedResult extends Component {
  template() {
    return `
      <div class="d-flex">
        <label class="flex-auto my-0">총 ${Store.state.amount}개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input type="checkbox" class="lotto-numbers-toggle-button" ${Store.state.checked ? "checked" : ""}/>
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div class="d-flex flex-wrap purchased-numbers-wrapper ${this.getToggleClass()}">
        ${this.getLotteriesTemplate()}
      </div>
    `;
  }

  getLotteriesTemplate() {
    const { lottoNumbers, amount } = Store.state;
    const lotteries = [];
    for (let i = 0; i < amount; i++) {
      const numbers = lottoNumbers[i].join(",");
      lotteries.push(
        `<span class="mx-1 text-4xl ticket">🎟️ <span class="mx-1 text-4xl numbers">${numbers}</span></span>`
      );
    }
    return lotteries.join("");
  }

  getToggleClass() {
    return Store.state.checked ? "show" : "";
  }

  mounted() {
    const toggleButton = this.$target.querySelector(".lotto-numbers-toggle-button");
    toggleButton.addEventListener("change", (e) => {
      const { checked } = e.target;
      setState(EVENT.TOGGLE_LOTTERY_NUMBERS, { checked });
    });
  }
}
