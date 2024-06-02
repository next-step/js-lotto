import { $, $all } from "../../../utils/dom.js";
import Lotto from "../../domain/Lotto.js";
import LottoNumber from "../../domain/LottoNumber.js";

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

  addEventListeners(elements, event, handler) {
    if (Array.isArray(elements)) {
      elements.forEach((element) => {
        element.addEventListener(event, handler.bind(this, element));
      });
      return;
    }

    elements.addEventListener(event, handler.bind(this));
  },

  handleWinningNumberInput(input, e) {
    try {
      if (e.target.value.length >= 2) {
        if (e.target.nextElementSibling) {
          e.target.nextElementSibling.focus();
        } else {
          e.target.blur();
        }
      }
    } catch (e) {
      alert(e.message);
      e.target.value = "";
    }
  },

  handleWinningNumberInputChange(input, e) {
    try {
      LottoNumber.validateLottoNumber(e.target.value);
      this.validateLottoNumberInputs();
    } catch (e) {
      input.focus();
      input.value = "";
      alert(e.message);
    }
  },

  handleBonusNumberInput(e) {
    try {
      if (e.target.value.length >= 2) {
        e.target.blur();
      }
    } catch (e) {
      alert(e.message);
      this.elements.BONUS_NUMBER_INPUT.value = "";
    }
  },

  handleBonusNumberInputChange(e) {
    try {
      LottoNumber.validateLottoNumber(e.target.value);
      this.validateLottoNumberInputs();
    } catch (e) {
      this.elements.BONUS_NUMBER_INPUT.focus();
      this.elements.BONUS_NUMBER_INPUT.value = "";
      alert(e.message);
    }
  },
};

export default WinningLottoForm;
