import Lotto from "../Lotto/index.js";
import {
  BonusNumberNotNumberError,
  BonusNumberOutOfRangeError,
  BonusNumberDuplicatedError,
} from "./errors.js";

export default class WinningLotto extends Lotto {
  #bonusNumber;

  static LOWER_BOUND = 1;
  static UPPER_BOUND = 45;

  static from(winningNumbers, bonusNumber) {
    return new WinningLotto(winningNumbers, bonusNumber);
  }

  constructor(winningNumbers, bonusNumber) {
    super(winningNumbers);
    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #isDuplicateBonusNumber(bonusNumber) {
    const winningNumbers = this.getLottoNumbers();
    return winningNumbers.includes(bonusNumber);
  }

  #isOutOfRange(bonusNumber) {
    return (
      bonusNumber < WinningLotto.LOWER_BOUND ||
      bonusNumber > WinningLotto.UPPER_BOUND
    );
  }

  #validateBonusNumber(bonusNumber) {
    if (typeof bonusNumber !== "number") throw new BonusNumberNotNumberError();
    if (this.#isOutOfRange(bonusNumber)) throw new BonusNumberOutOfRangeError();
    if (this.#isDuplicateBonusNumber(bonusNumber))
      throw new BonusNumberDuplicatedError();
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}
