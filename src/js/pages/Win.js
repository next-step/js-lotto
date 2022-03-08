import Component from "../lib/Component.js";
import {$, $$} from "../modules/utils.js";

export default class Win extends Component {
  template() {
    const {winningNumbers, bonusNumber} = this.props;
    return `
      <form class="mt-9">
        <label class="flex-auto d-inline-block mb-3">
          지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.
        </label>
        <div class="d-flex">
          <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div id="winningNumber">
              ${
                new Array(6).fill().reduce((str, ele, i) => {
                  str += `
                    <input
                      type="number"
                      class="winning-number mx-1 text-center"
                      value="${winningNumbers[i] || ''}"
                    />
                  `;
                  return str;
                }, '')
              }
            </div>
          </div>
          <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div class="d-flex justify-center">
              <input type="number" class="bonus-number text-center" value="${bonusNumber || ''}"/>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="open-result-modal-button mt-5 btn btn-cyan w-100"
        >
          결과 확인하기
        </button>
      </form>
    `;
  }
  mounted() {
    const {showModal} = this.props;
    $('.open-result-modal-button').addEventListener('click', () => {
      showModal(
        [].map.call($$('#winningNumber .winning-number'), ele => Number.parseInt(ele.value)),
        Number.parseInt($('.bonus-number').value)
      );
    });
  }
}