import { DOM } from '../constants.js';
import { $ } from '../utils/dom.js';

class Modal {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.render();
    this.setEvent();
  }

  setState(nextState) {
    this.state = { ...nextState };
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  template() {
    return String.raw`
        <div class="modal-inner p-10">
          <div id="${DOM.MODAL_CLOSE_BUTTON_ID}" class="modal-close">
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
                <td class="p-3"><span id="${DOM.MODAL_5TH_PLACE_COUNT_ID}"></span>개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">4개</td>
                <td class="p-3">50,000</td>
                <td class="p-3"><span id="${DOM.MODAL_4TH_PLACE_COUNT_ID}"></span>개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개</td>
                <td class="p-3">1,500,000</td>
                <td class="p-3"><span id="${DOM.MODAL_3RD_PLACE_COUNT_ID}"></span>개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개 + 보너스볼</td>
                <td class="p-3">30,000,000</td>
                <td class="p-3"><span id="${DOM.MODAL_2ND_PLACE_COUNT_ID}"></span>개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">6개</td>
                <td class="p-3">2,000,000,000</td>
                <td class="p-3"><span id="${DOM.MODAL_1ST_PLACE_COUNT_ID}"></span>개</td>
              </tr>
            </tbody>
          </table>  
        </div>
        <p class="text-center font-bold">당신의 총 수익률은 <span id="${DOM.MODAL_YIELD_ID}"></span>%입니다.</p>
        <div class="d-flex justify-center mt-5">
          <button type="button" id="${DOM.RESTART_BUTTON_ID}" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    `;
  }

  setEvent() {
    $(`#${DOM.MODAL_CLOSE_BUTTON_ID}`).onclick = this.closeModal.bind(this);
    $(`#${DOM.RESTART_BUTTON_ID}`).onclick = this.props.restart;
  }

  openModalWithResultAndYield(winningResult, totalYield) {
    this.renderWinningResult(winningResult);
    this.renderTotalYield(totalYield);
    $(`.${DOM.MODAL_CLASS}`).classList.add('open');
  }

  renderWinningResult(winningResult) {
    $(`#${DOM.MODAL_1ST_PLACE_COUNT_ID}`).textContent = winningResult.first;
    $(`#${DOM.MODAL_2ND_PLACE_COUNT_ID}`).textContent = winningResult.second;
    $(`#${DOM.MODAL_3RD_PLACE_COUNT_ID}`).textContent = winningResult.third;
    $(`#${DOM.MODAL_4TH_PLACE_COUNT_ID}`).textContent = winningResult.fourth;
    $(`#${DOM.MODAL_5TH_PLACE_COUNT_ID}`).textContent = winningResult.fifth;
  }

  renderTotalYield(totalYield) {
    $(`#${DOM.MODAL_YIELD_ID}`).textContent = totalYield;
  }

  closeModal() {
    $(`.${DOM.MODAL_CLASS}`).classList.remove('open');
  }
}

export default Modal;
