import Component from "../Component.js";
import { LOTTOS_ACTION } from "../../utils/constants.js";
import { $ } from "../../utils/selectors.js";

export default class LottoManualInput extends Component {
  constructor(app, props) {
    super(app, props);
    this.render();
    this.mount();
  }
  template = () => {
    const { manualTicket, lottos } = this.props.getState();
    return `<label class="mb-2 d-inline-block"
        >수동으로 구매할 로또 티켓의 수를 입력해주세요.
      </label>
      <div class="d-flex">
        <input
          name="manual-purchase"
          type="number"
          class="input-manual-purchase w-100 mr-2 pl-2"
          value="${manualTicket ? manualTicket : ""}"
          placeholder="티켓의 수"
          data-cy="manual-purchase"
          min="1"
          ${lottos.length === 0 ? "" : "disabled"}
      />
      <button type="submit" class="btn btn-cyan manual-purchase" data-cy="btn-manual-purchase">확인</button>
      </div>`;
  };
  mount = () => {
    this.$app.addEventListener("submit", (e) => {
      e.preventDefault();
      const manualTicket = e.target.elements["manual-purchase"];
      const manualTicketValue = manualTicket.value;
      const purchase = Number($(".input-purchase").value);
      if (Number(purchase) % 1000 !== 0 || !purchase) {
        alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
        return;
      }
      if (purchase > 100000) {
        alert("구입 금액이 100,000원을 초과할 수 없습니다.");
        return;
      }
      if (manualTicketValue * 1000 > purchase && manualTicketValue > 0) {
        alert("유효한 로또 티켓의 수를 입력해주세요");
        manualTicket.value = "";
        return;
      }
      this.props.setState({ type: LOTTOS_ACTION.SET_LOTTO_MANUAL_TICKET, data: manualTicketValue });
    });
  };
}
