import Component from "../core/Component.js";
import { Store, setState } from "../store/index.js";
import { EVENT } from "../utils/const.js";
export default class Modal extends Component {
  template() {
    return `
      <div class="modal ${this.getToggleClass()}">
        <div class="modal-inner p-10">
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
                  <td class="p-3" data-test="three">${Store.state.result["lotto-3"].count}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">4개</td>
                  <td class="p-3">50,000</td>
                  <td class="p-3 data-test="four">${Store.state.result["lotto-4"].count}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개</td>
                  <td class="p-3">1,500,000</td>
                  <td class="p-3" data-test="five">${Store.state.result["lotto-5"].count}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개 + 보너스볼</td>
                  <td class="p-3">30,000,000</td>
                  <td class="p-3" data-test="five-bonus">${Store.state.result["lotto-5-bonus"].count}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">6개</td>
                  <td class="p-3">2,000,000,000</td>
                  <td class="p-3" data-test="six">${Store.state.result["lotto-6"].count}개</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p id="profit" class="text-center font-bold">당신의 총 수익률은 ${Store.state.profit}%입니다.</p>
          <div class="d-flex justify-center mt-5">
            <button id="retry-btn" type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
        </div>
      </div>
    `;
  }

  getToggleClass() {
    return Store.state.showModal ? "open" : "";
  }

  mounted() {
    const $modalClose = this.$target.querySelector(".modal-close");
    const $retryButton = this.$target.querySelector("#retry-btn");

    const onModalClose = () => {
      setState(EVENT.CLOSE_RESULT_MODAL, { showModal: false });
    };

    const onClickRetry = () => {
      setState(EVENT.RETRY);
    };

    $modalClose.addEventListener("click", onModalClose);
    $retryButton.addEventListener("click", onClickRetry);
  }
}
