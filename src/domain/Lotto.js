import { LOTTO_RULES } from "../util/rule.js";

class Lotto {
  #winningNumber;

  #bonusNumber;

  constructor({ winningNumber, bonusNumber }) {
    // this.#setpurchasePrice(
    //   purchasePrice,
    //   LOTTO_RULES.purChasePriceRule,
    //   "잘못된 구입금액 설정입니다.",
    // );
    winningNumber &&
      this.setWinningNumber(
        winningNumber,
        LOTTO_RULES.winningNumberRule,
        "잘못된 당첨번호 설정입니다.",
      );
    bonusNumber &&
      this.setBonusNumber(
        bonusNumber,
        LOTTO_RULES.bonusNumberRule,
        "잘못된 보너스 번호 설정입니다.",
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
