import { LOTTO_RULES } from "../util/rule.js";
import { ERROR_LOTTO } from "../util/error.js";

class Lotto {
  #winningNumber;

  #bonusNumber;

  constructor({ winningNumber, bonusNumber }) {
    winningNumber &&
      this.setWinningNumber(
        winningNumber,
        LOTTO_RULES.winningNumberRule,
        ERROR_LOTTO.WRONG_WINNING_NUMBER_SETTING,
      );
    bonusNumber &&
      this.setBonusNumber(
        bonusNumber,
        LOTTO_RULES.bonusNumberRule,
        ERROR_LOTTO.WRONG_BONUS_NUMBER_SETTING,
      );
  }

  setWinningNumber(winningNumber, predicate, errorMessage) {
    if (predicate(winningNumber) === false) {
      throw new Error(errorMessage);
    }
    this.#winningNumber = winningNumber;
  }

  get getWinningNumber() {
    return this.#winningNumber;
  }

  setBonusNumber(bonusNumber, predicate, errorMessage) {
    if (predicate(bonusNumber) === false) {
      throw new Error(errorMessage);
    }
    this.#bonusNumber = bonusNumber;
  }

  get getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default Lotto;
