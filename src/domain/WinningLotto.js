import { LottoNumber } from "./LottoNumber.js";
import { LottoShop } from "./LottoShop.js";

export class WinningLotto {
  #lotto;

  #bonusNumber;

  static validateWinningNumber(winningNumber) {
    if (winningNumber.length !== LottoShop.LOTTO_NUMBER_COUNT) {
      throw new Error(
        `당첨 번호는 ${LottoShop.LOTTO_NUMBER_COUNT}개의 숫자로 이루어져야 합니다.`
      );
    }

    if (
      winningNumber.some((num) => typeof num !== "number" || Number.isNaN(num))
    ) {
      throw new Error("당첨 번호는 모두 숫자여야 합니다.");
    }
  }

  static validateBonusNumber(bonusNumber) {
    if (
      bonusNumber < LottoNumber.RANGE.MIN ||
      bonusNumber > LottoNumber.RANGE.MAX
    ) {
      throw new Error(
        `로또 번호는 ${LottoNumber.RANGE.MIN}~${LottoNumber.RANGE.MAX} 사이여야 합니다. 입력값: ${bonusNumber}`
      );
    }
  }

  constructor({ winningNumber, bonusNumber }) {
    this.#lotto = LottoShop.createLotto(winningNumber);
    this.#bonusNumber = LottoNumber.of(bonusNumber);
  }

  static of({ winningNumber, bonusNumber }) {
    return new WinningLotto({ winningNumber, bonusNumber });
  }

  get value() {
    return {
      lotto: this.#lotto,
      bonusNumber: this.#bonusNumber,
    };
  }
}
