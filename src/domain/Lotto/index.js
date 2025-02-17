import LOTTO_RULES from "./rule.js";
import ERROR_LOTTO from "./error.js";

class Lotto {
  #winningNumber;

  #bonusNumber;

  constructor({ winningNumber, bonusNumber }) {
    if (LOTTO_RULES.winningNumberRule(winningNumber) === false) {
      throw new Error(ERROR_LOTTO.WRONG_WINNING_NUMBER_SETTING);
    }
    this.setWinningNumber(winningNumber);

    if (LOTTO_RULES.bonusNumberRule(bonusNumber) === false) {
      throw new Error(ERROR_LOTTO.WRONG_BONUS_NUMBER_SETTING);
    }
    this.setBonusNumber(bonusNumber);
  }

  setWinningNumber(winningNumber) {
    this.#winningNumber = winningNumber;
  }

  get getWinningNumber() {
    return this.#winningNumber;
  }

  setBonusNumber(bonusNumber) {
    this.#bonusNumber = bonusNumber;
  }

  get getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default Lotto;
