import { ErrorLottoBonusNumber } from "../constants/error.js";
import LottoNumber from "./LottoNumber.js";

class WinningLotto {
  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto;
    this.#bonusNumber = new LottoNumber(bonusNumber);
    this.validateBonusNumber(this.#bonusNumber);
  }

  get winningLotto() {
    return this.#winningLotto;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  validateBonusNumber(bonusNumber) {
    if (this.#winningLotto.hasLottoNumber(bonusNumber)) {
      throw new Error(
        ErrorLottoBonusNumber.ERROR_LOTTO_BONUS_NUMBER_DUPLICATED
      );
    }
  }
}

export default WinningLotto;
