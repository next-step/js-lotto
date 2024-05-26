import { ErrorLottoBonusNumber } from "../constants/error.js";
import LottoNumber from "./LottoNumber.js";

class WinningLotto {
  #winningLotto;
  #bonusNumberInstance;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto;
    this.#bonusNumberInstance = new LottoNumber(bonusNumber);
    this.validateBonusNumber(this.#bonusNumberInstance);
  }

  get winningLotto() {
    return this.#winningLotto;
  }

  get bonusNumberInstance() {
    return this.#bonusNumberInstance;
  }

  get bonusNumber() {
    return this.#bonusNumberInstance.value;
  }

  validateBonusNumber(bonusNumberInstance) {
    if (this.#winningLotto.hasLottoNumberInstance(bonusNumberInstance)) {
      throw new Error(
        ErrorLottoBonusNumber.ERROR_LOTTO_BONUS_NUMBER_DUPLICATED
      );
    }
  }

  matchInfo(lotto) {
    const count = this.#winningLotto.lottoNumberInstances.filter(
      (lottoNumberInstance) => lotto.hasLottoNumberInstance(lottoNumberInstance)
    ).length;

    const bonusNumberMatched = lotto.lottoNumberInstances.includes(
      this.#bonusNumberInstance
    );
    return {
      count,
      bonusNumberMatched,
    };
  }
}

export default WinningLotto;
