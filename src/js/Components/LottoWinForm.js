import Component from "../Core/Component.js";
import { SET_WINNING_NUMBERS, SET_BONUS_NUMBER } from "../modules/actions.js";
import { setWinningNumbers, setBonusNumber } from "../modules/creator.js";
import { store } from "../modules/store.js";
import { $ } from "../utils/dom.js";

const actionMap = {
  SET_WINNING_NUMBERS: (numArr) => {
    store.dispatch(setWinningNumbers(numArr));
  },

  SET_BONUS_NUMBER: (num) => {
    store.dispatch(setBonusNumber(num));
  },
};

export default class LottoWinForm extends Component {
  constructor(target) {
    super(target);
  }

  setEvent(target) {
    this.buttonEvent(target);
  }

  buttonEvent() {
    $("#show-result-btn").addEventListener("click", () => {
      const numArr = [];
      const winningNums = document.querySelectorAll(".winning-number");
      const bonusNum = document.querySelector(".bonus-number").value;

      winningNums.forEach((node) => numArr.push(node.value));

      console.log("sss", numArr);
      console.log("sss", bonusNum);

      actionMap[SET_WINNING_NUMBERS](numArr);
      actionMap[SET_BONUS_NUMBER](bonusNum);
    });
  }

  template() {
    const props = store.getState();
    console.log(props);

    return `
    <form class="mt-9" id="input-lotto-nums" aria-labelledby="input-winning-numbers"  style="display: block;">
        <label id="input-winning-numbers" class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
        <div class="d-flex">
            <div>
            <p class="mt-0 mb-3 text-center font-bold">당첨 번호</p>
            <div>
                <input type="number" class="winning-number mx-1 text-center" aria-label="winning-number-1" data-index-num="0" required="" min="1" max="45">
                <input type="number" class="winning-number mx-1 text-center" aria-label="winning-number-2" data-index-num="1" required="" min="1" max="45">
                <input type="number" class="winning-number mx-1 text-center" aria-label="winning-number-3" data-index-num="2" required="" min="1" max="45">
                <input type="number" class="winning-number mx-1 text-center" aria-label="winning-number-4" data-index-num="3" required="" min="1" max="45">
                <input type="number" class="winning-number mx-1 text-center" aria-label="winning-number-5" data-index-num="4" required="" min="1" max="45">
                <input type="number" class="winning-number mx-1 text-center" aria-label="winning-number-6" data-index-num="5" required="" min="1" max="45">
            </div>
            </div>
            <div class="bonus-number-container flex-grow">
            <p class="mt-0 mb-3 text-center font-bold">보너스 번호</p>
            <div class="d-flex justify-center">
                <input type="number" class="bonus-number text-center" aria-label="winning-number-bounus" data-index-num="6" required="" min="1" max="45">
            </div>
            </div>
        </div>
        <button id="show-result-btn" class="open-result-modal-button mt-5 btn btn-cyan w-100">
            결과 확인하기
        </button>
    </form>
    `;
  }
}
