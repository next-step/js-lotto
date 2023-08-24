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

  static from(numbers, bonusNumber) {
    return new WinningLotto(numbers, bonusNumber);
  }

  constructor(numbers, bonusNumber) {
    super(numbers);
    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #isDuplicateBonusNumber(number) {
    const winningNumbers = this.getLottoNumbers();
    return winningNumbers.includes(number);
  }

  #isOutOfRange(number) {
    return (
      number < WinningLotto.LOWER_BOUND || number > WinningLotto.UPPER_BOUND
    );
  }

  #validateBonusNumber(number) {
    if (typeof number !== "number") throw new BonusNumberNotNumberError();
    if (this.#isOutOfRange(number)) throw new BonusNumberOutOfRangeError();
    if (this.#isDuplicateBonusNumber(number))
      throw new BonusNumberDuplicatedError();
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}
