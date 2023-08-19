import { ERROR_MESSAGE } from '../constants/error-message';

export class WinningLotto {
  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.validateDuplicatedBonusNumber(winningLotto, bonusNumber);
    this.#winningLotto = winningLotto;
    this.#bonusNumber = bonusNumber;
  }

  get winningLotto() {
    return this.#winningLotto;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  validateDuplicatedBonusNumber(winningLotto, bonusNumber) {
    if (winningLotto.has(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_BONUS_NUMBER);
    }
  }
}
