import { ErrorLottoBonusNumber } from "../constants/error.js";
import LottoNumber from "./LottoNumber.js";

class WinningLotto {
  #winningLotto;
  #bonusLottoNumber;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto;
    this.#bonusLottoNumber = new LottoNumber(bonusNumber);
    this.validateBonusNumber(this.#bonusLottoNumber);
  }

  get winningLotto() {
    return this.#winningLotto;
  }

  get bonusLottoNumber() {
    return this.#bonusLottoNumber;
  }

  get bonusNumber() {
    return this.#bonusLottoNumber.value;
  }

  validateBonusNumber(bonusLottoNumber) {
    if (this.#winningLotto.contains(bonusLottoNumber)) {
      throw new Error(
        ErrorLottoBonusNumber.ERROR_LOTTO_BONUS_NUMBER_DUPLICATED
      );
    }
  }

  matchInfo(lotto) {
    const count = this.#winningLotto.lottoNumbers.filter((lottoNumber) =>
      lotto.contains(lottoNumber)
    ).length;

    const bonusNumberMatched = lotto.lottoNumbers.includes(
      this.#bonusLottoNumber
    );
    return {
      count,
      bonusNumberMatched,
    };
  }
}

export default WinningLotto;
