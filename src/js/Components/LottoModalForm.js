import Component from "../Core/Component.js";
import { SET_PRICE } from "../modules/actions.js";
import { setPrice } from "../modules/creator.js";
import { store } from "../modules/store.js";
import { $ } from "../utils/dom.js";

const actionMap = {};

export default class LottoWinForm extends Component {
  constructor(target) {
    super(target);
  }

  setEvent(target) {}

  buttonEvent() {}

  template() {
    const props = store.getState();
    console.log(props);
    return `
    <section class="modal open" role="dialog" aria-modal="true" aria-labelledby="title-dialog">
        <div class="modal-inner p-10">
          <button type="button" class="modal-close" aria-label="close-button">
            <svg viewBox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
            </svg>
          </button>

          <h2 id="title-dialog" class="text-center">🏆 당첨 통계 🏆</h2>
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
                  <td class="p-3">
                    <span class="match-count">0</span>개
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">4개</td>
                  <td class="p-3">50,000</td>
                  <td class="p-3">
                    <span class="match-count">0</span>개
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개</td>
                  <td class="p-3">1,500,000</td>
                  <td class="p-3">
                    <span class="match-count">0</span>개
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개 + 보너스볼</td>
                  <td class="p-3">30,000,000</td>
                  <td class="p-3">
                    <span class="match-count">0</span>개
                  </td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">6개</td>
                  <td class="p-3">2,000,000,000</td>
                  <td class="p-3">
                    <span class="match-count">0</span>개
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-center font-bold">
            당신의 총 수익률은 <span id="profit">-100</span>% 입니다.
          </p>
          <div class="d-flex justify-center mt-5">
            <button type="reset" id="reset-btn" class="btn btn-cyan">다시 시작하기</button>
          </div>
        </div>
      </section>
    `;
  }
}
