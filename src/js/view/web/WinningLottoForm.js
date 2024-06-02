import { $, $all } from "../../../utils/dom.js";
import Lotto from "../../domain/Lotto.js";

const WinningLottoForm = {
  elements: {
    WINNING_LOTTO_FORM: $(".winning-lotto-form"),
    WINNING_NUMBER_INPUTS: $all(".winning-number"),
    BONUS_NUMBER_INPUT: $(".bonus-number"),
  },

  get winningNumberInputs() {
    return [...this.elements.WINNING_NUMBER_INPUTS];
  },

  isValidWinningNumbers() {
    return this.winningNumberInputs.every((winningLottoNumberInput) => {
      return winningLottoNumberInput.validity.valid;
    });
  },

  isValidBonusNumber() {
    return this.elements.BONUS_NUMBER_INPUT.validity.valid;
  },

  validateLottoNumberInputs() {
    const lottoNumberCandidates = [
      ...WinningLottoForm.winningNumbers(),
      WinningLottoForm.bonusNumber(),
    ].filter(Boolean);
    Lotto.validateLottoNumbers(lottoNumberCandidates);
  },

  winningNumbers() {
    return this.winningNumberInputs.map(
      (winningNumberInput) => winningNumberInput.value
    );
  },

  bonusNumber() {
    return this.elements.BONUS_NUMBER_INPUT.value;
  },

  show() {
    this.reset();
    this.elements.WINNING_LOTTO_FORM.classList.remove("d-none");
  },

  hide() {
    this.elements.WINNING_LOTTO_FORM.classList.add("d-none");
  },

  reset() {
    this.elements.WINNING_NUMBER_INPUTS.forEach((winningNumberInput) => {
      winningNumberInput.value = "";
    });

    this.elements.BONUS_NUMBER_INPUT.value = "";
  },
};

export default WinningLottoForm;
