import User from "./model/User.mjs";
import PurchaseForm from "./viewModel/PurchaseForm.mjs";
import LottoHistory from "./viewModel/LottoHistory.mjs";

const $app = document.querySelector("#app");
const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(
  ".lotto-numbers-toggle-button"
);

export default class WinningNumberForm {
  #numberForm;

  constructor() {
    this.#numberForm = document.querySelector(".number-form");

    this.#numberForm.addEventListener("submit", this.#handleSubmit);
    this.#numberForm.addEventListener("keyup", this.#handleKeyup);
  }

  #handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 모달을 띄운다.
    // TODO: 현재입력한 번호와 이전에 입력한 로또번호를 전달한다.
  };

  /**
   * @param {KeyboardEvent} e
   */
  #handleKeyup = ({ target: { tagName, dataset, valueAsNumber } }) => {
    if (tagName === "INPUT") {
      if (dataset.numberIndex) {
        // 일반 번호
      }
      // 보너스 번호
    }
  };
}
