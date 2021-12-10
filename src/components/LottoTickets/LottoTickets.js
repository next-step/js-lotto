import Component from "../Component.js";
import { LOTTOS_ACTION } from "../../utils/constants.js";

export default class LottoTickets extends Component {
  constructor(app, props) {
    super(app, props);
    this.render();
    this.mount();
  }
  template = () => {
    const { purchaseMoney, toggle, lottos } = this.props.getState();
    if (purchaseMoney === 0) return "";
    return `
    <div class="d-flex">
      <label class="flex-auto my-0" data-cy="lotto-total">총 ${lottos.length}개를 구매하였습니다.</label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" class="lotto-numbers-toggle-button" ${toggle && "checked"} data-cy="toggle-lotto"/>
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    <div class="d-flex flex-wrap">
        ${lottos
          .map((lotto) => {
            return `<span class="mx-1 text-4xl lotto-wrapper">
                        <span class="lotto-icon" data-cy="lotto-icon">🎟️</span>
                        <span class="lotto-detail" ${
                          !toggle ? `style="display: none"` : `style="display: inline"`
                        } data-cy="lotto-detail">${lotto.join(", ")}</span>
                    </span>`;
          })
          .join("")}
    </div>`;
  };
  mount = () => {
    this.$app.addEventListener("change", (e) => {
      if (e.target.className === "lotto-numbers-toggle-button") {
        this.props.setState({
          type: LOTTOS_ACTION.TOGGLE_LOTTO_DISPLAY,
          data: e.target.checked,
        });
      }
    });
  };
}
