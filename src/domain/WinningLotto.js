import LottoNumber from "./LottoNumber.js";

class WinningLotto {
  static INVALID_LOTTO_NUMBER_TYPE =
    "모든 로또 번호는 LottoNumber 클래스여야 합니다.";
  static INVALID_BONUS_NUMBER = "보너스 번호는 당첨 번호에 포함될 수 없습니다.";

  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.validateLottoNumbers(winningNumbers, bonusNumber);

    [...winningNumbers].sort((a, b) => a.getValue() - b.getValue());
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  validateLottoNumbers(winningNumbers, bonusNumber) {
    if (!(bonusNumber instanceof LottoNumber)) {
      throw new Error(WinningLotto.INVALID_LOTTO_NUMBER_TYPE);
    }
    winningNumbers.forEach((winningNumber) => {
      if (!(winningNumber instanceof LottoNumber)) {
        throw new Error(WinningLotto.INVALID_LOTTO_NUMBER_TYPE);
      }
      if (winningNumber.equals(bonusNumber)) {
        throw new Error(WinningLotto.INVALID_BONUS_NUMBER);
      }
    });
  }

  countMatchNumbers(lotto) {
    return lotto.countMatches(this.#winningNumbers);
  }

  hasBonus(lotto) {
    return lotto.contains(this.#bonusNumber);
  }
}

export default WinningLotto;
