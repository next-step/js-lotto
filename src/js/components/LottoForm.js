import Component from "../core/Component.js";
import { setState } from "../store/index.js";
import { EVENT } from "../utils/const.js";

export default class LottoForm extends Component {
  template() {
    return `
      <form class="mt-5">
        <label class="mb-2 d-inline-block">
          구입할 금액을 입력해주세요.
        </label>
        <div class="d-flex">
          <input
            type="number"
            class="w-100 mr-2 pl-2"
            placeholder="구입 금액"
          />
          <button type="submit" class="btn btn-cyan">확인</button>
        </div>
      </form>
    `;
  }

  mounted() {
    const form = this.$target.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = e.target.querySelector("input");
      const price = input.value;
      setState(EVENT.INPUT_PRICE, { price });
    });
  }
}
