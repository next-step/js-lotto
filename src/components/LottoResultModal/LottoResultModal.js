import { $, $all } from "../../utils/selectors.js";
import Component from "../component.js";

export default class LottoResultModal extends Component {
  constructor(app, props) {
    super(app, props);
    this.render();
    this.mount();
  }
  mount = () => {
    this.$app.addEventListener("click", (e) => {
      if (e.target.closest(".btn-restart")) {
        this.props.setState({ type: "RESTART" });
      }
      if (e.target.closest(".modal-close")) {
        this.props.setState({ type: "CLOSE_MODAL" });
      }
    });
  };
  template = () => {
    const { showResultModal, result, earningRatio } = this.props.getState();
    showResultModal ? this.$app.classList.add("open") : this.$app.classList.remove("open");
    return `<div class="modal-inner p-10">
    <div class="modal-close">
      <svg viewbox="0 0 40 40">
        <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </div>

    <h2 class="text-center">🏆 당첨 통계 🏆</h2>
    <div class="d-flex justify-center">
      <table class="result-table border-collapse border border-black">
        <thead>
          <tr class="text-center">
            <th class="p-3">일치 갯수</th>
            <th class="p-3">당첨금</th>
            <th class="p-3">당첨 갯수</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center">
            <td class="p-3">3개</td>
            <td class="p-3">5,000</td>
            <td class="p-3">${result["3"][0]}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">4개</td>
            <td class="p-3">50,000</td>
            <td class="p-3">${result["4"][0]}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">5개</td>
            <td class="p-3">1,500,000</td>
            <td class="p-3">${result["5"][0]}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">5개 + 보너스볼</td>
            <td class="p-3">30,000,000</td>
            <td class="p-3">${result["5a"][0]}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">6개</td>
            <td class="p-3">2,000,000,000</td>
            <td class="p-3">${result["6"][0]}개</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-center font-bold">당신의 총 수익률은 
    ${earningRatio}%입니다.</p>
    <div class="d-flex justify-center mt-5">
      <button type="button" class="btn-restart btn btn-cyan">다시 시작하기</button>
    </div>
  </div>`;
  };
}
