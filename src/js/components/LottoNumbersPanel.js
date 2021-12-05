import Component from "../core/Component.js";
import { Store, setState } from "../store/index.js";
import { EVENT } from "../utils/const.js";
import { LOTTERY_COUNT } from "../utils/const.js";
export default class LottoNumbersPanel extends Component {
  template() {
    return `
      <form class="mt-9">
        <label class="flex-auto d-inline-block mb-3"
          >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
        >
        <div class="d-flex">
          <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div>
              ${this.getWinningNumbersPanel()}
            </div>
          </div>
          <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            ${this.getBonusNumberPanel()}
          </div>
        </div>
        <button
          type="submit"
          class="open-result-modal-button mt-5 btn btn-cyan w-100"
        >
          결과 확인하기
        </button>
      </form>
    `;
  }

  getWinningNumbersPanel() {
    const winningNumbersInput = [];
    for (let i = 0; i < LOTTERY_COUNT; i++) {
      if (Store.state.winningNumbers.length === 0) {
        winningNumbersInput.push(`<input type="number" class="winning-number mx-1 text-center" />`);
      } else {
        winningNumbersInput.push(
          `<input type="number" value=${Store.state.winningNumbers[0]} class="winning-number mx-1 text-center" />`
        );
      }
    }
    return winningNumbersInput.join("");
  }

  getBonusNumberPanel() {
    if (Store.state.bonusNumber) {
      return `
      <div class="d-flex justify-center">
        <input type="number" value=${Store.state.bonusNumber} class="bonus-number text-center" />
      </div>
    `;
    } else {
      return `
      <div class="d-flex justify-center">
        <input type="number" class="bonus-number text-center" />
      </div>
      `;
    }
  }

  getUniqueWinningNumbers() {
    const winningNumbers = Array.from(this.$target.querySelectorAll(".winning-number"))
      .map((input) => +input.value)
      .filter((value) => value !== "");
    return [...new Set(winningNumbers)];
  }

  mounted() {
    const $showResultButton = this.$target.querySelector(".open-result-modal-button");
    $showResultButton.addEventListener("click", (e) => {
      e.preventDefault();
      const bonusNumber = +this.$target.querySelector(".bonus-number").value;
      const uniqueWinningNumbers = this.getUniqueWinningNumbers();
      if (uniqueWinningNumbers.size < LOTTERY_COUNT || !bonusNumber) {
        window.alert("Please input correct winning numbers and bonus number");
      } else {
        setState(EVENT.SHOW_RESULT_MODAL, {
          showModal: true,
          winningNumbers: uniqueWinningNumbers,
          bonusNumber: bonusNumber,
        });
      }
    });
  }
}
