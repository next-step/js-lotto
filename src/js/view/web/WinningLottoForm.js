import { $, $all } from "../../../utils/dom.js";

const WinningLottoForm = {
  selector: {
    WINNING_LOTTO_FORM: $(".winning-lotto-form"),
    WINNING_NUMBER_INPUTS: $all(".winning-number"),
    BONUS_NUMBER_INPUT: $(".bonus-number"),
  },

  isValidWinningNumbers() {
    return Array.from(this.selector.WINNING_NUMBER_INPUTS).every(
      (winningLottoNumberInput) => {
        return winningLottoNumberInput.validity.valid;
      }
    );
  },

  isValidBonusNumber() {
    return this.selector.BONUS_NUMBER_INPUT.validity.valid;
  },

  winningNumbers() {
    return Array.from(this.selector.WINNING_NUMBER_INPUTS).map(
      (winningNumberInput) => winningNumberInput.value
    );
  },

  bonusNumber() {
    return this.selector.BONUS_NUMBER_INPUT.value;
  },

  show() {
    this.reset();
    this.selector.WINNING_LOTTO_FORM.classList.remove("d-none");
  },

  hide() {
    this.selector.WINNING_LOTTO_FORM.classList.add("d-none");
  },

  reset() {
    this.selector.WINNING_NUMBER_INPUTS.forEach((winningNumberInput) => {
      winningNumberInput.value = "";
    });

    this.selector.BONUS_NUMBER_INPUT.value = "";
  },
};

export default WinningLottoForm;
