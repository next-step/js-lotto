import { ERROR_MESSAGE } from '../constants/error-message.js';

export class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(winningLotto, bonusNum) {
    const bonusNumber = parseInt(bonusNum, 10);
    this.#validateBonusNumber(bonusNumber);
    this.#validateDuplicatedBonusNumber(winningLotto, bonusNumber);
    this.#lotto = winningLotto;
    this.#bonusNumber = bonusNumber;
  }

  get numbers() {
    return this.#lotto.numbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  #validateDuplicatedBonusNumber(winningLotto, bonusNumber) {
    if (winningLotto.has(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_BONUS_NUMBER);
    }
  }

  #validateBonusNumber(bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_LOTTO_NUMBER);
    }
  }
}
