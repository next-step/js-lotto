import { $, $all } from "../../utils/selectors.js";
import Component from "../component.js";

export default class LottoWinningNumber extends Component {
  constructor(app, props) {
    super(app, props);
    this.render();
    this.mount();
  }
  template = () => {
    const { purchaseMoney, winningNums, bonusNum } = this.props.getState();
    if (purchaseMoney === 0) return "";
    return `
    <label class="flex-auto d-inline-block mb-3"
      >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
    >
    <div class="d-flex">
      <div>
        <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
        <div>
          <input
            name="win-num"
            value="${winningNums.length ? winningNums[0] : ""}"
            type="number"
            class="winning-number mx-1 text-center"
          />
          <input
            name="win-num"
            value="${winningNums.length ? winningNums[1] : ""}"
            type="number"
            class="winning-number mx-1 text-center"
          />
          <input
            name="win-num"
            value="${winningNums.length ? winningNums[2] : ""}"
            type="number"
            class="winning-number mx-1 text-center"
          />
          <input
            name="win-num"
            value="${winningNums.length ? winningNums[3] : ""}"
            type="number"
            class="winning-number mx-1 text-center"
            />
            <input
            name="win-num"
            value="${winningNums.length ? winningNums[4] : ""}"
            type="number"
            class="winning-number mx-1 text-center"
          />
          <input
            name="win-num"
            value="${winningNums.length ? winningNums[5] : ""}"
            type="number"
            class="winning-number mx-1 text-center"
          />
        </div>
      </div>
      <div class="bonus-number-container flex-grow">
        <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
        <div class="d-flex justify-center">
          <input name="bonus-num" value="${bonusNum ? bonusNum : ""}" type="number" class="bonus-number text-center" />
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="open-result-modal-button mt-5 btn btn-cyan w-100"
    >
      결과 확인하기
    </button>
    `;
  };
  mount = () => {
    this.$app.addEventListener("submit", (e) => {
      e.preventDefault();
      const bonusNum = e.target.elements["bonus-num"].value;
      const winningNums = Array.prototype.map.call(e.target.elements["win-num"], (winNum) => Number(winNum.value));
      this.props.setState({
        type: "UPDATE_LOTTO_RESULT",
        data: { winningNums, bonusNum },
      });
    });
  };
}
