import Component from "../Component.js";
import { LOTTOS_ACTION } from "../../utils/constants.js";
import { manualTicketInputTemplate } from "./template.js";
import { $all } from "../../utils/selectors.js";

export default class LottoManualTicket extends Component {
  constructor(app, props) {
    super(app, props);
    this.render();
    this.mount();
  }

  template = () => {
    const { manualTicket } = this.props.getState();

    if (manualTicket === 0) {
      return "";
    }

    return `<label class="flex-auto d-inline-block mb-3">
      1~45 사이의 로또 번호를 차례대로 입력해주세요
    </label>
    <div class="d-flex">
      <div>
        <h4 class="mt-0 mb-3 text-center">로또 번호</h4>
        ${Array.from({ length: manualTicket }).map(manualTicketInputTemplate).join("")}
      </div>
    </div>
    <button type="submit" class="btn btn-cyan manual-tickets" data-cy="btn-manual-tickets">
      눌러서 로또 발급하기
    </button>`;
  };

  mount = () => {
    this.$app.addEventListener("submit", (e) => {
      e.preventDefault();
      this.props.setState({
        type: LOTTOS_ACTION.BUY_MANUAL_LOTTOS,
        data: Array.prototype.map.call($all(".winning-number"), (lottoNum) => Number(lottoNum.value)),
      });
    });
  };
}
