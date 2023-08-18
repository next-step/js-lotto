import Lotto from "../Lotto";
import {
  BonusNumberNotNumberError,
  BonusNumberOutOfRangeError,
  BonusNumberDuplicatedError,
} from "./errors";

export default class WinningLotto extends Lotto {
  #bonusNumber;

  static from(numbers, bonusNumber) {
    return new WinningLotto(numbers, bonusNumber);
  }

  constructor(numbers, bonusNumber) {
    super(numbers);
    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  isDuplicateBonusNumber(number) {
    const winningNumbers = this.getLottoNumbers();
    return winningNumbers.includes(number);
  }

  validateBonusNumber(number) {
    if (typeof number !== "number") throw new BonusNumberNotNumberError();
    // CHECK 아래 코드 이렇게 재사용해도 될지 고민해보기
    if (Lotto.prototype.isOutOfRange(number))
      throw new BonusNumberOutOfRangeError();
    if (this.isDuplicateBonusNumber(number))
      throw new BonusNumberDuplicatedError();
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}
