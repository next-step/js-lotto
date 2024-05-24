import { $, $all } from "../../../utils/dom.js";

let instance;
class WinningLottoForm {
  #$winningLottoForm;
  #winningLottoNumberInputs;
  #$bonusNumberInput;

  constructor() {
    if (instance) {
      return instance;
    }

    this.#$winningLottoForm = $(".winning-lotto-form");
    this.#winningLottoNumberInputs = $all(".winning-number");
    this.#$bonusNumberInput = $(".bonus-number");

    instance = this;
  }

  get isValidWinningNumbers() {
    return Array.from(this.#winningLottoNumberInputs).every(
      (winningLottoNumberInput) => {
        return winningLottoNumberInput.validity.valid;
      }
    );
  }

  get isValidBonusNumber() {
    return this.#$bonusNumberInput.validity.valid;
  }

  get winningNumbers() {
    return Array.from(this.#winningLottoNumberInputs).map(
      (winningNumberInput) => winningNumberInput.value
    );
  }

  get bonusNumber() {
    return this.#$bonusNumberInput.value;
  }

  show() {
    this.reset();
    this.#$winningLottoForm.classList.remove("d-none");
  }

  hide() {
    this.#$winningLottoForm.classList.add("d-none");
  }

  reset() {
    this.#winningLottoNumberInputs.forEach((winningNumberInput) => {
      winningNumberInput.value = "";
    });

    this.#$bonusNumberInput.value = "";
  }
}

export default WinningLottoForm;
